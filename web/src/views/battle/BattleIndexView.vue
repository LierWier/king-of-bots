<template>
  <div class="container mt-3">
    <match-ground v-if="$store.state.battle.status !== 'playing'" />
    <div class="row" v-if="$store.state.battle.status === 'playing'">
      <div class="col-3">
        <battle-info />
      </div>
      <div class="col-6">
        <my-card>
          <play-ground />
          <div class="">
            你是:
            <span :class="'badge rounded-pill '+($store.state.battle.playerA.id===$store.state.user.id?'bg-primary':'bg-danger')">
              {{ $store.state.battle.playerA.id === $store.state.user.id ? '蓝色方' : '红色方'}}
            </span>
          </div>
          <result-board v-if="$store.state.battle.loser !== 'none'" />
        </my-card>
      </div>
      <div class="col-3">
        <my-card>
          操作
        </my-card>
      </div>
    </div>
  </div>
</template>

<script>
import PlayGround from "@/components/PlayGround";
import {useStore} from "vuex";
import {onMounted, onUnmounted} from "vue";
import MatchGround from "@/components/MatchGround";
import MyCard from "@/components/utils/MyCard";
import BattleInfo from "@/components/BattleInfo";
import ResultBoard from "@/components/ResultBoard";

export default {
  name: "BattleIndexView",
  components: {ResultBoard, BattleInfo, MyCard, MatchGround, PlayGround},

  setup() {
    const store = useStore()
    const socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.user.token}/`
    let socket = null

    store.commit("updateLoser", "none")
    store.commit("updateIsRecord", false)

    onMounted(() => {
      store.commit("updateOpponent", store.state.battle.opponent_default)

      socket = new WebSocket(socketUrl)
      socket.onopen = () => {
        console.log(`connected!`)
        store.commit('updateSocket', socket)
      }
      socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data)
        if (data.event === 'start-matching') {
          store.commit('updateOpponent', {
            username: data.opponent_username,
            photo: data.opponent_photo
          })
          store.commit('updateStatus', 'matched')
          store.commit('updateGame', data.game)
          setTimeout(() => {
            store.commit('updateStatus', 'playing')
          }, 200)
        } else if (data.event === 'move') {
          console.log(data)
          const game = store.state.battle.gameObject
          const [snakeA, snakeB] = game.snakes
          snakeA.set_direction(data.a_direction)
          snakeB.set_direction(data.b_direction)
        } else if (data.event === 'result') {
          console.log(data)
          const game = store.state.battle.gameObject
          const [snakeA, snakeB] = game.snakes

          if (data.loser === 'all') {
            snakeA.status = snakeB.status = 'die'
          } else if (data.loser === 'A') {
            snakeA.status = 'die'
          } else if (data.loser === "B") {
            snakeB.status = 'die'
          }
          store.commit('updateLoser', data.loser)
        }
      }
      socket.onclose = () => {
        console.log(`disconnected!`)
      }
    })

    onUnmounted(() => {
      socket.close()
      store.commit('updateStatus', 'matching')
      store.commit('updateLoser', 'none')
      store.commit("updateOpponent", store.state.battle.opponent_default)
    })
  }
}
</script>

<style scoped>

</style>