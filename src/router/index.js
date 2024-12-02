import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AppHome from '@/views/AppHome.vue'
import Cohere from '@/views/Cohere.vue'
import ResumeBuilder from '@/views/ResumeBuilder.vue'
import AdminView from '@/views/AdminView.vue'
import UserManagement from '@/views/UserManagement.vue'

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
    {
      path: '/user-management',
      name: 'UserManagement',
      component: UserManagement,
      meta: {requiresAuth: true, requiresAdmin: true}
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
  const admin = isAdmin();
  console.log('Navigating to:', to.name);
  console.log('Is admin:', admin);

  if (to.meta.requiresAuth && !isAuthenticated()) {
    console.log('Not authenticated, redirecting to login...');
    next('/'); // Redirect to login if not authenticated
  } else if (to.meta.requiresAdmin && !admin) {
    console.log('Not an admin, redirecting to home...');
    next('/home'); // Redirect non-admin users to the home page
  } else {
    // Allow admin to navigate to any route with requiresAdmin: true
    console.log('Navigation allowed.');
    next();
  }
});


export default router
