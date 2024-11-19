import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AppHome from '@/views/AppHome.vue'
import cohere from '@/views/Cohere.vue'
import ResumeBuilder from '@/views/ResumeBuilder.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/builder',
      name: 'resumeBuilder',
      component: ResumeBuilder,
      meta: { requiresAuth: true }
    },
    {
      path: '/cohere',
      name: 'cohere',
      component: cohere,
      meta: { requiresAuth: true }
    },
    {
      path: '/adminView',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
