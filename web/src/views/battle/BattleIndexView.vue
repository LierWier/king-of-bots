<template>
  <my-card class="container mt-3">
    <play-ground />
  </my-card>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
import PlayGround from "@/components/PlayGround";

export default {
  name: "BattleIndexView",
  components: {PlayGround, MyCard}
}
</script>

<style scoped>

</style>