import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '../views/OverviewView.vue'

const routes = [
  {
    path: '/',
    name: 'overview',
    component: OverviewView
  },
  {
    path: '/assignments',
    name: 'assignments',
    component: () => import('../views/AssignmentsView.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/CoursesView.vue')
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('../views/StudentsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router