import { get } from "lodash"
import { toast } from "sonner"

const url='http://localhost:4001/images/upload'

export const uploadFile = async (file: File):Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    const msg = get(JSON.parse(errorText), 'message', 'File upload failed')
    toast.error('File upload error:', msg)
    throw new Error('File upload failed')
  }

  const data = await response.json()
  return data.imageUrl
}
