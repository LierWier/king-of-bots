<template>
  <my-card class="rounded">
    <div class="row">
      <div class="col-4">
        <img :src="$store.state.record.a_photo" alt="" class="rounded" style="width: 100%">
      </div>
      <div class="col-8">
        <div class="fs-5 fw-bold">
          {{ $store.state.record.a_username }}
        </div>
        <div>
          <span class="badge rounded-pill bg-primary">
            蓝色方
          </span>
        </div>
      </div>
    </div>
    <!--    <div class="mt-1">-->
    <!--      <div class="badge bg-warning m-1">No.1</div>-->
    <!--      <div class="badge bg-danger m-1">VIP</div>-->
    <!--      <div class="badge bg-success m-1">10连胜</div>-->
    <!--    </div>-->
    <hr />
    <div class="row">
      <div class="col-4">
        <img :src="$store.state.record.b_photo" alt="" class="rounded" style="width: 100%">
      </div>
      <div class="col-8">
        <div class="fs-5 fw-bold">
          {{ $store.state.record.b_username }}
        </div>
        <div>
          <span class="badge rounded-pill bg-danger">
            红色方
          </span>
        </div>
      </div>
    </div>
    <!--    <div class="mt-1">-->
    <!--      <div class="badge bg-warning m-1">No.2</div>-->
    <!--      <div class="badge bg-danger m-1">VIP</div>-->
    <!--      <div class="badge bg-success m-1">7连胜</div>-->
    <!--    </div>-->
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
  </my-card>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
export default {
  name: "RecordInfo",
  components: {MyCard}
}
</script>

<style scoped>
.chat-box {
  background-color: lightgrey;
  height: 200px;
}
</style>