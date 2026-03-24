import { useState, useRef } from 'react'
import { Save, LogOut, Plus, Trash2, Loader2, Upload } from 'lucide-react'
import { useOctokit } from './useOctokit'
import { Toast } from '../components/ui/Toast'
import type { ToastType } from '../components/ui/Toast'
import type { SiteContent, Painting, OtherWorkItem } from '../types/content'
import contentJson from '../data/content.json'

interface AdminPanelProps {
  token: string
  onLogout: () => void
}

type Tab = 'hero' | 'about' | 'paintings' | 'otherWork' | 'contact'

const TABS: { id: Tab; label: string }[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About Me' },
  { id: 'paintings', label: 'Paintings' },
  { id: 'otherWork', label: 'Other Work' },
  { id: 'contact', label: 'Contact' },
]

const inputCls =
  'flex-1 px-4 py-2.5 border border-rim bg-bg text-ink placeholder-muted focus:outline-none focus:ring-1 focus:ring-accent transition text-sm'

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 border border-rim bg-bg text-ink placeholder-muted focus:outline-none focus:ring-1 focus:ring-accent transition text-sm resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${inputCls}`}
        />
      )}
    </div>
  )
}

function MediaField({
  label,
  value,
  onChange,
  accept,
  placeholder,
  uploadFile,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  accept: string
  placeholder?: string
  uploadFile: (file: File) => Promise<string>
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const url = await uploadFile(file)
      onChange(url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputCls}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          title="Upload file"
          className="flex items-center gap-1.5 px-3 py-2.5 border border-rim text-sm font-medium text-ink hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          {uploading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Upload className="w-4 h-4" />}
          {uploading ? 'Subiendo…' : 'Subir'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {uploadError && (
        <p className="text-xs text-red-500 dark:text-red-400">{uploadError}</p>
      )}
    </div>
  )
}

export function AdminPanel({ token, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('hero')
  const [form, setForm] = useState<SiteContent>(contentJson as SiteContent)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const { saveContent, uploadFile } = useOctokit(token)

  const update = <K extends keyof SiteContent>(section: K, value: SiteContent[K]) => {
    setForm((prev) => ({ ...prev, [section]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveContent(form)
      setToast({
        message: 'Changes saved! Site is publishing — this may take ~2 minutes.',
        type: 'success',
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setToast({ message: `Error saving: ${msg}`, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const addPainting = () => {
    const newItem: Painting = { id: Date.now().toString(), title: '', imageUrl: '', videoUrl: '', description: '' }
    update('paintings', [...form.paintings, newItem])
  }

  const removePainting = (id: string) => {
    update('paintings', form.paintings.filter((p) => p.id !== id))
  }

  const updatePainting = (id: string, field: keyof Painting, value: string) => {
    update(
      'paintings',
      form.paintings.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  const addOtherWork = () => {
    const newItem: OtherWorkItem = {
      id: Date.now().toString(),
      title: '',
      imageUrl: '',
      videoUrl: '',
      description: '',
      link: '',
    }
    update('otherWork', [...form.otherWork, newItem])
  }

  const removeOtherWork = (id: string) => {
    update('otherWork', form.otherWork.filter((w) => w.id !== id))
  }

  const updateOtherWork = (id: string, field: keyof OtherWorkItem, value: string) => {
    update(
      'otherWork',
      form.otherWork.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <header className="bg-surface border-b border-rim px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif italic text-xl font-light text-ink">
            Admin Panel
          </h1>
          <p className="text-xs text-muted mt-0.5">
            lia-portfolio / lia-portfolio-website
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed text-bg text-sm font-medium transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 border border-rim text-ink hover:bg-surface text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-surface border border-rim p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-accent text-bg'
                  : 'text-muted hover:bg-bg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-surface border border-rim p-6 flex flex-col gap-6">
          {/* ── Hero ── */}
          {activeTab === 'hero' && (
            <>
              <h2 className="font-serif italic text-lg font-light text-ink">
                Hero Section
              </h2>
              <Field
                label="Name"
                value={form.hero.name}
                onChange={(v) => update('hero', { ...form.hero, name: v })}
                placeholder="Lia"
              />
              <Field
                label="Tagline"
                value={form.hero.tagline}
                onChange={(v) => update('hero', { ...form.hero, tagline: v })}
                placeholder="Artist & Visual Creator"
              />
              <MediaField
                label="Background Image URL"
                value={form.hero.backgroundUrl}
                onChange={(v) => update('hero', { ...form.hero, backgroundUrl: v })}
                accept="image/*"
                placeholder="https://example.com/hero-bg.jpg"
                uploadFile={uploadFile}
              />
              <MediaField
                label="Background Video URL (takes priority over image)"
                value={form.hero.videoUrl}
                onChange={(v) => update('hero', { ...form.hero, videoUrl: v })}
                accept="video/*"
                placeholder="https://example.com/hero-bg.mp4"
                uploadFile={uploadFile}
              />
            </>
          )}

          {/* ── About ── */}
          {activeTab === 'about' && (
            <>
              <h2 className="font-serif italic text-lg font-light text-ink">
                About Me
              </h2>
              <Field
                label="Biography"
                value={form.about.text}
                onChange={(v) => update('about', { ...form.about, text: v })}
                multiline
                placeholder="Write a short biography..."
              />
              <MediaField
                label="Photo URL"
                value={form.about.photoUrl}
                onChange={(v) => update('about', { ...form.about, photoUrl: v })}
                accept="image/*"
                placeholder="https://example.com/photo.jpg"
                uploadFile={uploadFile}
              />
            </>
          )}

          {/* ── Paintings ── */}
          {activeTab === 'paintings' && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-serif italic text-lg font-light text-ink">
                  Paintings
                </h2>
                <button
                  onClick={addPainting}
                  className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/70 font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Painting
                </button>
              </div>
              {form.paintings.map((p, i) => (
                <div
                  key={p.id}
                  className="border border-rim p-4 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted uppercase tracking-wider">
                      Painting #{i + 1}
                    </span>
                    <button
                      onClick={() => removePainting(p.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      aria-label="Remove painting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Field
                    label="Title"
                    value={p.title}
                    onChange={(v) => updatePainting(p.id, 'title', v)}
                    placeholder="Untitled No. 1"
                  />
                  <MediaField
                    label="Image URL"
                    value={p.imageUrl}
                    onChange={(v) => updatePainting(p.id, 'imageUrl', v)}
                    accept="image/*"
                    placeholder="https://example.com/painting.jpg"
                    uploadFile={uploadFile}
                  />
                  <MediaField
                    label="Video URL (takes priority over image)"
                    value={p.videoUrl}
                    onChange={(v) => updatePainting(p.id, 'videoUrl', v)}
                    accept="video/*"
                    placeholder="https://example.com/painting.mp4"
                    uploadFile={uploadFile}
                  />
                  <Field
                    label="Description"
                    value={p.description}
                    onChange={(v) => updatePainting(p.id, 'description', v)}
                    placeholder="Oil on canvas, 2024"
                  />
                </div>
              ))}
            </>
          )}

          {/* ── Other Work ── */}
          {activeTab === 'otherWork' && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-serif italic text-lg font-light text-ink">
                  Other Work
                </h2>
                <button
                  onClick={addOtherWork}
                  className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/70 font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
              {form.otherWork.map((w, i) => (
                <div
                  key={w.id}
                  className="border border-rim p-4 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted uppercase tracking-wider">
                      Item #{i + 1}
                    </span>
                    <button
                      onClick={() => removeOtherWork(w.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Field
                    label="Title"
                    value={w.title}
                    onChange={(v) => updateOtherWork(w.id, 'title', v)}
                    placeholder="Photography Series"
                  />
                  <MediaField
                    label="Image URL"
                    value={w.imageUrl}
                    onChange={(v) => updateOtherWork(w.id, 'imageUrl', v)}
                    accept="image/*"
                    placeholder="https://example.com/work.jpg"
                    uploadFile={uploadFile}
                  />
                  <MediaField
                    label="Video URL (takes priority over image)"
                    value={w.videoUrl}
                    onChange={(v) => updateOtherWork(w.id, 'videoUrl', v)}
                    accept="video/*"
                    placeholder="https://example.com/work.mp4"
                    uploadFile={uploadFile}
                  />
                  <Field
                    label="Description"
                    value={w.description}
                    onChange={(v) => updateOtherWork(w.id, 'description', v)}
                    placeholder="A short description..."
                  />
                  <Field
                    label="External Link (optional)"
                    value={w.link}
                    onChange={(v) => updateOtherWork(w.id, 'link', v)}
                    placeholder="https://..."
                  />
                </div>
              ))}
            </>
          )}

          {/* ── Contact ── */}
          {activeTab === 'contact' && (
            <>
              <h2 className="font-serif italic text-lg font-light text-ink">
                Contact & Social
              </h2>
              <Field
                label="Email"
                value={form.contact.email}
                onChange={(v) => update('contact', { ...form.contact, email: v })}
                placeholder="lia@example.com"
              />
              <Field
                label="Phone"
                value={form.contact.phone}
                onChange={(v) => update('contact', { ...form.contact, phone: v })}
                placeholder="+34 600 000 000"
              />
              <Field
                label="Instagram URL"
                value={form.contact.instagram}
                onChange={(v) => update('contact', { ...form.contact, instagram: v })}
                placeholder="https://instagram.com/lia"
              />
              <Field
                label="Twitter / X URL"
                value={form.contact.twitter}
                onChange={(v) => update('contact', { ...form.contact, twitter: v })}
                placeholder="https://x.com/lia"
              />
              <Field
                label="LinkedIn URL"
                value={form.contact.linkedin}
                onChange={(v) => update('contact', { ...form.contact, linkedin: v })}
                placeholder="https://linkedin.com/in/lia"
              />
            </>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
