<template>
  <div class="playground">
    <local-game-map />
  </div>
</template>

<script>
import LocalGameMap from "@/components/LocalGameMap";
export default {
  name: "LocalPlayGround",
  components: {LocalGameMap}
}
</script>

<style scoped>
div.playground {
  width: 100%;
  background: lightblue;
}
</style>