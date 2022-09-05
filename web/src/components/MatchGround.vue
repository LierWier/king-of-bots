<template>
  <div class="match-ground">
    <div class="row h-100 align-items-center">
      <div class="col-6 text-center">
        <div class="user-photo">
          <img class="rounded-circle" :src="$store.state.user.photo" alt="">
        </div>
        <div class="user-username text-light fs-5 fw-bold center">
          {{ $store.state.user.username }}
        </div>
      </div>
      <div class="col-6 text-center">
        <div class="user-photo">
          <img class="rounded-circle" :src="$store.state.battle.opponent_photo" alt="">
        </div>
        <div class="user-username text-light fs-5 fw-bold center">
          {{ $store.state.battle.opponent_username }}
        </div>
      </div>
      <div class="col-12 text-center ">
        <div v-if="$store.state.battle.status==='matched'" type="button" class="btn btn-success fw-bold">
          匹配成功
          <span class="ms-2">√</span>
        </div>
        <button v-else-if="btn_display==='开始匹配'" type="button" class="btn btn-warning fw-bold" @click="match_start">开始匹配</button>
        <button v-else-if="btn_display==='取消匹配'" type="button" class="btn btn-danger fw-bold" @click="match_cancel" >
          取消匹配
          <span class="spinner-border spinner-border-sm ms-2 text-light" role="status"></span>
        </button>
        <div class="user-select-bot w-25 m-auto mt-3">
          <select v-model="bot_selected" :disabled="isMatching" class="form-select" aria-label="Default select example">
            <option value="-1" selected>键盘</option>
            <option v-for="bot in bots" :key="bot.id" :value="bot.id">{{ bot.title }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import $ from 'jquery';

export default {
  name: "MatchGround",

  setup() {
    const store = useStore()
    let btn_display = ref('开始匹配')
    let bots = ref([])
    let bot_selected = ref('-1')
    let isMatching = ref(false)

    const match_start = () => {
      btn_display.value = '取消匹配'
      isMatching.value = true
      console.log(bot_selected.value)
      store.state.battle.socket.send(
          JSON.stringify({
            event: `start-matching`,
            bot_id: bot_selected.value,
          })
      )
    }
    const match_cancel = () => {
      btn_display.value = '开始匹配'
      isMatching.value = false
      store.state.battle.socket.send(
          JSON.stringify({
            event: `stop-matching`
          })
      )
    }
    // const match_success = () => {
    //   btn_display = '匹配成功'
    // }

    const refresh_bots = () => {
      $.ajax({
        url: "https://app2711.acapp.acwing.com.cn/api/user/bot/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token
        },
        success(resp) {
          bots.value = resp
        },
        error() {
          console.log("Bots列表更新失败")
        }
      })
    }
    refresh_bots()

    return {btn_display, match_start, match_cancel, bots, bot_selected, isMatching}
  }
}
</script>

<style scoped>
div.match-ground {
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
  background-color: rgba(50, 50, 50, 0.5);
}
div.user-photo > img {
  width: 20vh;
}
</style>