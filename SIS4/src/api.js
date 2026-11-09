import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
})

export const dashboardApi = {
  // (GET, POST, PATCH, DELETE)
  getAssignments: () => api.get('/todos?_limit=10'),
  createAssignment: (data) => api.post('/todos', data),
  toggleAssignment: (id, completed) => api.patch(`/todos/${id}`, { completed }),
  deleteAssignment: (id) => api.delete(`/todos/${id}`),

  //  (GET)
  getCourses: () => api.get('/posts?_limit=6'),

  //  (GET)
  getStudents: () => api.get('/users')
}

export default api