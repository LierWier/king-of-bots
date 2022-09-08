import { createRouter, createWebHistory } from 'vue-router'
import BattleIndexView from "@/views/battle/BattleIndexView";
import recordIndexView from "@/views/record/RecordIndexView";
import rankIndexView from "@/views/ranklist/RankIndexView";
import userBotIndexView from "@/views/user/bots/UserBotIndexView";
import notFound from "@/views/error/NotFound";
import userAccountLoginView from "@/views/user/account/UserAccountLoginView";
import userAccountRegisterView from "@/views/user/account/UserAccountRegisterView";
import store from "@/store";
import recordContentView from "@/views/record/RecordContentView";
import localBattleIndexView from "@/views/localBattle/LocalBattleIndexView";
import localBattleContentView from "@/views/localBattle/LocalBattleContentView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: localBattleIndexView,
    meta: {
      title: 'King of Bots',
      requestAuth: false
    }
  },
  {
    path: '/local',
    name: 'local_battle',
    component: localBattleIndexView,
    meta: {
      title: 'King of Bots',
      requestAuth: false
    }
  },
  {
    path: '/local/game',
    name: 'local_battle_game',
    component: localBattleContentView,
    meta: {
      title: 'King of Bots',
      requestAuth: false
    }
  },
  {
    path: '/battle',
    name: 'battle_index',
    component: BattleIndexView,
    meta: {
      title: 'King of Bots',
      requestAuth: true
    }
  },
  {
    path: '/record',
    name: 'record_index',
    component: recordIndexView,
    meta: {
      title: 'King of Bots - 对局列表',
      requestAuth: true
    }
  },
  {
    path: '/record/:recordId',
    name: 'record_content',
    component: recordContentView,
    meta: {
      title: 'King of Bots - 对局回放',
      requestAuth: true
    }
  },
  {
    path: '/rank',
    name: 'rank_index',
    component: rankIndexView,
    meta: {
      title: 'King of Bots - 排行榜',
      requestAuth: true
    }
  },
  {
    path: '/user/bots',
    name: 'user_bots_index',
    component: userBotIndexView,
    meta: {
      title: 'King of Bots - 我的bots',
      requestAuth: true
    }
  },
  {
    path: '/user/account/login/',
    name: 'user_account_login',
    component: userAccountLoginView,
    meta: {
      title: 'King of Bots - 登录',
      requestAuth: false
    }
  },
  {
    path: '/user/account/register/',
    name: 'user_account_register',
    component: userAccountRegisterView,
    meta: {
      title: 'King of Bots - 注册',
      requestAuth: false
    }
  },
  {
    path: '/404',
    name: '404',
    component: notFound,
    meta: {
      title: '找不到页面',
    }
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

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  if (to.meta.requestAuth && !store.state.user.is_login) {
    const jwt_token = localStorage.getItem("jwt_token")
    if (jwt_token) {
      store.commit("updateToken", jwt_token)
      store.dispatch("getInfo", {
        success() {
          next()
        },
        error() {
          next({name: "user_account_login"})
        }
      }).then(() => {})
    } else {
      next({name: "user_account_login"})
    }
  } else {
    next()
  }
})

export default router
