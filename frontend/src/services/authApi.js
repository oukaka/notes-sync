import http from './http'

export function register(email, password) {
  return http.post('/auth/register', { email, password })
}

export function login(email, password) {
  return http.post('/auth/login', { email, password })
}

export function getMe() {
  return http.get('/auth/me')
}