import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
})

export const postsApi = {
  // READ (all)
  getAll: () => api.get('/posts?_limit=12'),
  // READ (single by id + comments for dynamic route)
  getById: (id) => api.get(`/posts/${id}`),
  getComments: (id) => api.get(`/posts/${id}/comments`),
  // CREATE
  create: (data) => api.post('/posts', data),
  // UPDATE
  update: (id, data) => api.put(`/posts/${id}`, data),
  // DELETE
  remove: (id) => api.delete(`/posts/${id}`)
}

export const usersApi = {
  getAll: () => api.get('/users')
}

export default api