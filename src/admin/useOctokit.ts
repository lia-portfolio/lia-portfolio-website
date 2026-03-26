import { Octokit } from '@octokit/rest'
import type { SiteContent } from '../types/content'

const OWNER = 'lia-portfolio'
const REPO = 'lia-portfolio-website'
const BRANCH = 'main'
const FILE_PATH = 'src/data/content.json'

export function useOctokit(token: string) {
  const saveContent = async (newContent: SiteContent): Promise<void> => {
    const octokit = new Octokit({ auth: token })

    // Step 1: Get the current SHA (required by GitHub API for updates)
    let sha: string
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: FILE_PATH,
        ref: BRANCH,
      })

      if (Array.isArray(data) || data.type !== 'file') {
        throw new Error('Unexpected API response: path resolves to a directory')
      }

      sha = data.sha
    } catch (err) {
      const status = (err as { status?: number }).status
      if (status === 401 || status === 403) {
        throw new Error('Token inválido o sin permisos de escritura en el repositorio.')
      }
      if (status === 404) {
        throw new Error('No se encontró el archivo de contenido en el repositorio. Verifica la configuración.')
      }
      throw err
    }

    // Step 2: Encode the new JSON as Base64 (Unicode-safe)
    const jsonString = JSON.stringify(newContent, null, 2)
    const encoded = btoa(unescape(encodeURIComponent(jsonString)))

    // Step 3: Commit the updated file
    try {
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: OWNER,
        repo: REPO,
        path: FILE_PATH,
        message: 'chore: update site content via admin panel',
        content: encoded,
        sha,
        branch: BRANCH,
      })
    } catch (err) {
      const status = (err as { status?: number }).status
      const message = (err as { message?: string }).message ?? ''
      if (status === 409 || message.includes('Object not found here') || message.includes('sha')) {
        throw new Error('Conflicto al guardar: el archivo fue modificado simultáneamente. Vuelve a intentarlo.')
      }
      if (status === 401 || status === 403) {
        throw new Error('Token inválido o sin permisos de escritura en el repositorio.')
      }
      throw err
    }
  }

  const uploadFile = async (file: File): Promise<string> => {
    const octokit = new Octokit({ auth: token })

    // Read as Base64 via FileReader (browser-native, efficient for large files)
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = () => reject(reader.error ?? new Error('File read failed'))
      reader.readAsDataURL(file)
    })

    // Unique filename: timestamp + sanitized original name
    const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueName = `${Date.now()}_${sanitized}`
    const filePath = `public/uploads/${uniqueName}`

    // Commit the file (always new due to timestamp prefix, no SHA needed)
    try {
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: OWNER,
        repo: REPO,
        path: filePath,
        message: `chore: upload media ${uniqueName}`,
        content: base64,
        branch: BRANCH,
      })
    } catch (err) {
      const status = (err as { status?: number }).status
      if (status === 401 || status === 403) {
        throw new Error('Token inválido o sin permisos de escritura en el repositorio.')
      }
      if (status === 404) {
        throw new Error('No se pudo subir el archivo: repositorio o rama no encontrados. Verifica la configuración.')
      }
      throw err
    }

    // Return the public GitHub Pages URL
    return `/lia-portfolio-website/uploads/${uniqueName}`
  }

  return { saveContent, uploadFile }
}
