<template>
  <div class="result-board position-absolute top-50 start-50 translate-middle row align-items-center">
    <div class="fst-italic text-light fw-bold fs-1 text-center">
      <div v-if="$store.state.battle.loser === 'all'">
        Draw!
      </div>
      <div v-else-if="$store.state.battle.playerA.id === $store.state.user.id && $store.state.battle.loser === 'A'">
        You lose!
      </div>
      <div v-else-if="$store.state.battle.playerB.id === $store.state.user.id && $store.state.battle.loser === 'B'">
        You lose!
      </div>
      <div v-else>
        You win!
      </div>
    </div>
    <div class="text-center h-25">
      <button type="button" class="btn btn-secondary m-2" @click="quit">返回大厅</button>
<!--      <button type="button" class="btn btn-warning m-1" @click="again">再来一局</button>-->
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "ResultBoard",

  setup() {
    const store = useStore()

    const quit = () => {
      store.commit('updateLoser', 'none')
      store.commit('updateStatus', 'matching')
      store.commit("updateOpponent", store.state.battle.opponent_default)
    }

    const again = () => {

    }

    return {quit, again}
  }
}
</script>

<style scoped>
.result-board {
  width: 20vw;
  height: 15vw;
  background-color: rgba(50, 50, 50, 0.5);
}
</style>