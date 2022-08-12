<template>
  <div class="playground">
    <game-map />
    <div class="">
      你是:
      <span :class="'badge rounded-pill '+($store.state.battle.playerA.id===$store.state.user.id?'bg-primary':'bg-danger')">
        {{ $store.state.battle.playerA.id === $store.state.user.id ? '蓝色方' : '红色方'}}
      </span>
    </div>
    <result-board v-if="$store.state.battle.loser !== 'none'" />
  </div>
</template>

<script>
import GameMap from "@/components/GameMap";
import ResultBoard from "@/components/ResultBoard";
export default {
  name: "PlayGround",
  components: {ResultBoard, GameMap}
}
</script>

<style scoped>
div.playground {
  width: 100%;
  background: lightblue;
}
</style>