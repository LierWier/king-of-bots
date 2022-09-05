<template>
  <div class="container mt-3">
    <div class="row justify-content-md-center">
      <my-card class="col w-25 col-md-auto m-4">
        <div class="row row-cols-1">
          <div class="text-center">
            <img src="@/assets/images/logo.png" alt="">
            <div class="mt-2 fs-4 fw-bold">King of Bots</div>
          </div>
          <div class="col mt-2">
            <router-link :to="{name: 'local_battle_game'}">
              <button type="button" class="btn btn-warning">
                开始游戏
              </button>
            </router-link>
          </div>
          <div class="col mt-2">
            <router-link to>
              <button type="button" class="btn btn-secondary">
                帮助
              </button>
            </router-link>
          </div>
        </div>
      </my-card>
    </div>
  </div>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
export default {
  name: "LocalBattleIndexView",
  components: {MyCard}
}
</script>

<style scoped>
button {
  width: 100%;
}
</style>