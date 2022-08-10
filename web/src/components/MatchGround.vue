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
        <div v-if="$store.state.battle.status==='matched'" type="button" class="btn btn-success fw-bold">匹配成功</div>
        <button v-else-if="btn_display==='开始匹配'" type="button" class="btn btn-warning fw-bold" @click="match_start">开始匹配</button>
        <button v-else-if="btn_display==='取消匹配'" type="button" class="btn btn-danger fw-bold" @click="match_cancel" >取消匹配</button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "MatchGround",

  setup() {
    const store = useStore()
    let btn_display = ref('开始匹配')

    const match_start = () => {
      btn_display.value = '取消匹配'
      store.state.battle.socket.send(
          JSON.stringify({
            event: `start-matching`
          })
      )
    }
    const match_cancel = () => {
      btn_display.value = '开始匹配'
      store.state.battle.socket.send(
          JSON.stringify({
            event: `stop-matching`
          })
      )
    }
    // const match_success = () => {
    //   btn_display = '匹配成功'
    // }

    return {btn_display, match_start, match_cancel}
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