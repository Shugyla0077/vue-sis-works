import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // Lazy loading
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    // Lazy loading + Protected route
    component: () => import('../views/PostsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    // Dynamic routing (:id) + Lazy loading + Protected route
    path: '/posts/:id',
    name: 'post-detail',
    component: () => import('../views/PostDetailView.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'users',
    // Lazy loading
    component: () => import('../views/UsersView.vue')
  },
  {
    // 404 page for unknown routes
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard for Authorization
router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem('auth_user'))
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router