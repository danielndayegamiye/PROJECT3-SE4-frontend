import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AppHome from '@/views/AppHome.vue'
import cohere from '@/views/cohere.vue'
import ResumeBuilder from '@/views/ResumeBuilder.vue' // Import the ResumeBuilder component

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
    },
    {
      path: '/builder', // New route for the ResumeBuilder page
      name: 'resumeBuilder',
      component: ResumeBuilder,
    },
    {
      path: '/cohere', // New route for the ResumeBuilder page
      name: 'cohere',
      component: cohere,
    },
  ],
})

export default router
