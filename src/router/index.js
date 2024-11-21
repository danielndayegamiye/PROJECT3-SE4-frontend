import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AppHome from '@/views/AppHome.vue'
import Cohere from '@/views/Cohere.vue'
import ResumeBuilder from '@/views/ResumeBuilder.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: AppHome,
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/builder',
      name: 'resumeBuilder',
      component: ResumeBuilder,
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/cohere',
      name: 'cohere',
      component: Cohere,
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/adminView',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, requiresAdmin: true }, // Example for role-based protection
    },
  ],
})

// Example authentication function (replace with your actual logic)
function isAuthenticated() {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    const token = user.token
    return token && token !== 'null' // Adjust the logic as needed
  }
  return false
}

// Example role validation (optional)
function isAdmin() {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) return user.role === 'admin' // Adjust according to your app's logic
  return false
}

// Global navigation guard
router.beforeEach((to, from, next) => {
  const admin = isAdmin()
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/') // Redirect to login if not authenticated
  } else if (to.meta.requiresAdmin && !admin) {
    next('/home') // Redirect non-admin users to the home page
  } else if (admin && to.name !== 'admin') {
    // Prevent admins from accessing non-admin routes
    next('/adminView')
  } else {
    next() // Allow navigation
  }
})

export default router
