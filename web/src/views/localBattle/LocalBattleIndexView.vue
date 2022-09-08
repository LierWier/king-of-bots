<template>
  <div class="container mt-3">
    <div class="row justify-content-md-center">
      <my-card v-if="!is_help" class="col w-25 col-md-auto m-4">
        <div class="row row-cols-1">
          <div class="text-center">
            <img src="@/assets/images/logo.png" alt="">
            <div class="mt-2 fs-4 fw-bold">King of Bots</div>
          </div>
          <div class="col mt-2">
            <router-link :to="{name: 'local_battle_game'}">
              <button type="button" class="btn btn-warning fw-bold">
                开始游戏
              </button>
            </router-link>
          </div>
          <div class="col mt-2">
            <router-link :to="{name: 'battle_index'}">
              <button type="button" class="btn btn-warning fw-bold">
                在线对战
              </button>
            </router-link>
          </div>
          <div class="col mt-2">
            <router-link to>
              <button @click="click_help" type="button" class="btn btn-secondary fw-bold">
                帮助
              </button>
            </router-link>
          </div>
        </div>
      </my-card>
      <my-card v-else class="col w-25 col-md-auto m-4">
        <div class="row row-cols-1">
          <div class="text-center">
            <div class="mt-2 fs-4 fw-bold">King of Bots</div>
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            两名玩家同时移动一步，撞到墙体或蛇身判负。两名玩家都做出操作后确定移动，以最后一次操作为准。蛇在前10步每步增加1格子蛇身，10步以后每3步增加一格蛇身。
          </div>
          <div class="col mt-2">
            <router-link to>
              <button @click="click_help" type="button" class="btn btn-secondary">
                返回
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
import {ref} from "vue";
export default {
  name: "LocalBattleIndexView",
  components: {MyCard},

  setup() {
    let is_help = ref(false)

    const click_help = () => {
      is_help.value = !is_help.value
    }

    return { is_help, click_help }
  }
}
</script>

<style scoped>
button {
  width: 100%;
}
</style>