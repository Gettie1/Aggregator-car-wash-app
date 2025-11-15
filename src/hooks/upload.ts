import { get } from "lodash"
import { toast } from "sonner"
import { url } from "@/api/AuthApi"

const uploadUrl = `${url}/images/upload`

export const uploadFile = async (file: File):Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    const msg = get(JSON.parse(errorText), 'message', 'File upload failed')
    toast.error(`File upload error: ${msg}`)
    throw new Error('File upload failed')
  }

  const data = await response.json()
  return data.imageUrl
}
