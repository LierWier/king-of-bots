<template>
  <div class="playground">
    <game-map />
  </div>
</template>

<script>
import GameMap from "@/components/GameMap";
export default {
  name: "PlayGround",
  components: {GameMap}
}
</script>

<style scoped>
div.playground {
  width: 100%;
  background: lightblue;
}
</style>