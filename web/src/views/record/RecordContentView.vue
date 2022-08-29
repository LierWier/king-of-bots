<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-3">
        <record-info />
      </div>
      <div class="col-6">
        <my-card>
          <play-ground />
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
import MyCard from "@/components/utils/MyCard";
import PlayGround from "@/components/PlayGround";
import RecordInfo from "@/components/RecordInfo";
export default {
  name: "RecordContentView",
  components: {RecordInfo, PlayGround, MyCard}
}
</script>

<style scoped>

</style>