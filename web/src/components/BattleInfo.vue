<template>
  <my-card class="rounded">
    <!--  自己  -->
    <div class="row">
      <div class="col-4">
        <img :src="$store.state.user.photo" alt="" class="rounded" style="width: 100%">
      </div>
      <div class="col-8">
        <div class="fs-5 fw-bold">
          {{ $store.state.user.username }}
        </div>
        <div>
          <span :class="'badge rounded-pill '+($store.state.battle.playerA.id===$store.state.user.id?'bg-primary':'bg-danger')">
            {{ $store.state.battle.playerA.id === $store.state.user.id ? '蓝色方' : '红色方'}}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <div class="badge bg-warning m-1">No.1</div>
      <div class="badge bg-danger m-1">VIP</div>
      <div class="badge bg-success m-1">10连胜</div>
    </div>
    <hr />
    <!--  对手  -->
    <div class="row">
      <div class="col-4">
        <img :src="$store.state.battle.opponent_photo" alt="" class="rounded" style="width: 100%">
      </div>
      <div class="col-8">
        <div class="fs-5 fw-bold">
          {{ $store.state.battle.opponent_username }}
        </div>
        <div>
          <span :class="'badge rounded-pill '+($store.state.battle.playerA.id===$store.state.user.id?'bg-danger':'bg-primary')">
            {{ $store.state.battle.playerA.id === $store.state.user.id ? '红色方' : '蓝色方'}}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <div class="badge bg-warning m-1">No.2</div>
      <div class="badge bg-danger m-1">VIP</div>
      <div class="badge bg-success m-1">7连胜</div>
    </div>
    <hr />
    <div class="chat-box w-100 rounded p-3">
      <div class="text-center">
        聊天信息
      </div>
      <hr>
      <div class="chat-content">
        我：HelloWorld!<br>
      </div>
    </div>
    <div class="input-group mt-2">
      <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
      <button type="button" class="btn btn-outline-secondary">发送</button>
      <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">快点儿啊！我等我花都谢了！</a></li>
        <li><a class="dropdown-item" href="#">让我想一想！</a></li>
        <li><a class="dropdown-item" href="#">你的游戏玩的可真好！</a></li>
        <li><a class="dropdown-item" href="#">你是GG还是MM啊？</a></li>
      </ul>
    </div>
  </my-card>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
export default {
  name: "BattleInfo",
  components: {MyCard}
}
</script>

<style scoped>
.chat-box {
  background-color: lightgrey;
  height: 200px;
}
</style>