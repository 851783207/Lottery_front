import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Lottery from '@/views/Lottery.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: Lottery
    }
  ]
})

export default router
