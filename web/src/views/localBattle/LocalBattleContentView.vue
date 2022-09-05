<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-3">
        <my-card>
          蓝色：W A S D
          <br>
          红色：↑ ← ↓ →
        </my-card>
      </div>
      <div class="col-6">
        <my-card>
          <local-play-ground />
        </my-card>
      </div>
      <div class="col-3">
        <my-card class="container-fluid">
          <div class="row row-cols-1">
            <div class="col operate-btn">
              <button type="button" class="btn btn-warning" @click="restart">重新开始</button>
            </div>
            <div class="col operate-btn mt-2">
              <router-link :to="{name: 'local_battle'}">
                <button type="button" class="btn btn-danger">
                  退出游戏
                </button>
              </router-link>
            </div>
          </div>
        </my-card>
      </div>
    </div>
  </div>
  <div v-if="$store.state.localBattle.game_status === 'over'" class="result-board position-absolute top-50 start-50 translate-middle row align-items-center">
    <div class="fst-italic text-light fw-bold fs-1 text-center">
      <div v-if="$store.state.localBattle.a_status === 'die' && $store.state.localBattle.b_status === 'die'">
        Draw!
      </div>
      <div v-else>
        {{ $store.state.localBattle.a_status === 'die'?'Red Win!':'Blue Win!' }}
      </div>
    </div>
    <div class="text-center h-25">
      <button type="button" class="btn btn-warning m-2" @click="restart">再来一局</button>
      <router-link :to="{name: 'local_battle'}">
        <button type="button" class="btn btn-secondary">
          退出游戏
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
import LocalPlayGround from "@/components/LocalPlayGround";
import router from "@/router";
import store from "@/store";
import {onMounted} from "vue";

export default {
  name: "LocalBattleContentView",
  components: {LocalPlayGround, MyCard},

  setup() {
    onMounted(() => {
      store.commit("updateGameStatus", "")
      store.commit("updateAStatus", "")
      store.commit("updateBStatus", "")
    })

    const restart = () => {
      router.go(0)
      // store.commit("updateGameStatus", "")
      // store.commit("updateAStatus", "")
      // store.commit("updateBStatus", "")
    }

    return {
      restart
    }
  }
}
</script>

<style scoped>
.operate-btn button {
  width: 100%;
}
.result-board {
  width: 20vw;
  height: 15vw;
  background-color: rgba(50, 50, 50, 0.5);
}
</style>