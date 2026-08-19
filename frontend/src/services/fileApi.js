import http from './http';

export function listFiles() {
    return http.get('/files')
}

export function uploadFile(file){
    const formData = new FormData()
    formData.append('file', file)
    return http.post('/files', formData)
}

export function deleteFile(id) {
    return http.delete(`/files/${id}`)
}

export async function downloadFile(id, filename) {
  const res = await http.get(`/files/${id}/download`, {
    responseType: 'blob',
  })

  const blob = new Blob([res])
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}