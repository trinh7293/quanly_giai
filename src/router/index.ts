import MatchData from '@/components/MatchData.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MatchData,
    },
    {
      path: '/players',
      name: 'players',
      component: MatchData,
    },
    {
      path: '/team',
      name: 'team',
      component: MatchData,
    },
    {
      path: '/match',
      name: 'match',
      component: MatchData,
    },
    {
      path: '/round',
      name: 'round',
      component: MatchData,
    },
  ],
})

export default router
