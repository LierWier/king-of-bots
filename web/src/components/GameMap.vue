<template>
  <div ref="parent" class="gameMap">
    <canvas ref="canvas" tabindex="0"></canvas>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {GameMap} from "@/assets/scripts/GameMap";
import {useStore} from "vuex";

export default {
  name: "GameMap",

  setup() {
    const store = useStore()
    let parent = ref(null)
    let canvas = ref(null)

    onMounted(() => {
      const gameObject = new GameMap(canvas.value.getContext('2d'), parent.value, store)
      store.commit('updateGameObject', gameObject)
    })

    return {parent, canvas}
  }
}
</script>

<style scoped>
div.gameMap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>