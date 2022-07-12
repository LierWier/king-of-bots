import { createRouter, createWebHistory } from 'vue-router'
import BattleIndexView from "@/views/battle/BattleIndexView";
import recordIndexView from "@/views/record/RecordIndexView";
import rankIndexView from "@/views/ranklist/RankIndexView";
import userBotIndexView from "@/views/user/bots/UserBotIndexView";
import notFound from "@/views/error/NotFound";

const routes = [
  {
    path: '/',
    name: 'home',
    component: BattleIndexView
  },
  {
    path: '/battle',
    name: 'battle_index',
    component: BattleIndexView
  },
  {
    path: '/record',
    name: 'record_index',
    component: recordIndexView
  },
  {
    path: '/rank',
    name: 'rank_index',
    component: rankIndexView
  },
  {
    path: '/user/bots',
    name: 'user_bots_index',
    component: userBotIndexView
  },
  {
    path: '/404',
    name: '404',
    component: notFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
