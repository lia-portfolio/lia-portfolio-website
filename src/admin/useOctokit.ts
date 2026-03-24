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
    const { data } = await octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      ref: BRANCH,
    })

    if (Array.isArray(data) || data.type !== 'file') {
      throw new Error('Unexpected API response: path resolves to a directory')
    }

    const sha = data.sha

    // Step 2: Encode the new JSON as Base64 (Unicode-safe)
    const jsonString = JSON.stringify(newContent, null, 2)
    const encoded = btoa(unescape(encodeURIComponent(jsonString)))

    // Step 3: Commit the updated file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: 'chore: update site content via admin panel',
      content: encoded,
      sha,
      branch: BRANCH,
    })
  }

  const uploadFile = async (file: File): Promise<string> => {
    const octokit = new Octokit({ auth: token })

    // Read as raw binary → Base64 (correct for binary files like images/videos)
    const buffer = await file.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    const base64 = btoa(binary)

    // Unique filename: timestamp + sanitized original name
    const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueName = `${Date.now()}_${sanitized}`
    const filePath = `public/uploads/${uniqueName}`

    // Commit the file (always new due to timestamp prefix, no SHA needed)
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: filePath,
      message: `chore: upload media ${uniqueName}`,
      content: base64,
      branch: BRANCH,
    })

    // Return the public GitHub Pages URL
    return `/lia-portfolio-website/uploads/${uniqueName}`
  }

  return { saveContent, uploadFile }
}
