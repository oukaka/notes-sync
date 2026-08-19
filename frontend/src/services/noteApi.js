import http from './http'

export function listNotes() {
    return http.get('/notes')
}

export function getNote(id) {
  return http.get(`/notes/${id}`)
}

export function createNote(data) {
  return http.post('/notes', data)
}

export function updateNote(id, data) {
  return http.put(`/notes/${id}`, data)
}

export function deleteNote(id) {
  return http.delete(`/notes/${id}`)
}

