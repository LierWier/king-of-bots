<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-3">
        <my-card class="rounded">
          <img :src="$store.state.user.photo" alt="" class="rounded" style="width: 100%">
          <hr />
          <div class="text-center fs-5 fw-bold">
            {{ $store.state.user.username }}
          </div>
<!--          <div class="text-center">-->
<!--            <div class="badge bg-warning m-1">No.1</div>-->
<!--            <div class="badge bg-danger m-1">VIP</div>-->
<!--            <div class="badge bg-success m-1">10连胜</div>-->
<!--          </div>-->
<!--          <hr />-->
<!--          <div class="row text-center text-secondary">-->
<!--            <div class="col">-->
<!--              <div>关注</div>-->
<!--              <div>1234</div>-->
<!--            </div>-->
<!--            <div class="col">-->
<!--              <div>粉丝</div>-->
<!--              <div>1234.5w</div>-->
<!--            </div>-->
<!--          </div>-->
        </my-card>
      </div>
      <div class="col-9">
        <div class="card">
          <div class="card-header">
            <span class="fs-4">
              我的Bots
            </span>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-bot-modal">
              创建Bot
            </button>
            <!-- Modal -->
            <div class="modal fade" id="add-bot-modal" tabindex="-1">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">创建Bot</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="add-bot-title" class="form-label">名称</label>
                      <input v-model="bot_add.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-description" class="form-label">简介</label>
                      <textarea v-model="bot_add.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot简介"></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-code" class="form-label">代码</label>
                      <v-ace-editor
                          v-model:value="bot_add.content"
                          lang="c_cpp"
                          theme="textmate"
                          style="height: 300px" />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="error-message me-3">{{ bot_add.error_message }}</div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="add_bot">创建</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th>#</th>
                <th>名称</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(bot, index) in bots" :key="bot.id">
                <td>{{ index + 1 }}</td>
                <td>{{ bot.title }}</td>
                <td>{{ bot.createTime }}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" :data-bs-target="'#update-bot-modal-'+bot.id">修改</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="remove_bot(bot)">删除</button>
                  </div>
                  <!-- Modal -->
                  <div class="modal fade" :id="'update-bot-modal-'+bot.id" tabindex="-1">
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">创建Bot</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            <label for="add-bot-title" class="form-label">名称</label>
                            <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                          </div>
                          <div class="mb-3">
                            <label for="add-bot-description" class="form-label">简介</label>
                            <textarea v-model="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot简介"></textarea>
                          </div>
                          <div class="mb-3">
                            <label for="add-bot-code" class="form-label">代码</label>
                            <v-ace-editor
                                v-model:value="bot.content"
                                lang="c_cpp"
                                theme="textmate"
                                style="height: 300px" />
                          </div>
                        </div>
                        <div class="modal-footer">
                          <div class="error-message me-3">{{ bot.error_message }}</div>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                          <button type="button" class="btn btn-primary" @click="update_bot(bot)">保存</button>
                        </div>
                      </div>
                    </div>
                </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {useStore} from "vuex";
import MyCard from "@/components/utils/MyCard";
import {reactive, ref} from "vue";
import {Modal} from "bootstrap/dist/js/bootstrap"
import {VAceEditor} from "vue3-ace-editor";
import ace from "ace-builds";

export default {
  name: "UserBotIndexView",
  components: {MyCard, VAceEditor},

  setup() {
    const store = useStore()
    let bots = ref([]);
    ace.config.set(
        "basePath",
        "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/"
    )

    const bot_add = reactive({
      title: "",
      description: "",
      content: "",
      error_message: ""
    })

    const refresh_bots = () => {
      $.ajax({
        url: "https://app2711.acapp.acwing.com.cn/api/user/bot/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token
        },
        success(resp) {
          bots.value = resp
        },
        error() {
          console.log("Bots列表更新失败")
        }
      })
    }

    const add_bot = () => {
      bot_add.error_message = ""
      $.ajax({
        url: "https://app2711.acapp.acwing.com.cn/api/user/bot/add/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.token
        },
        data: {
          title: bot_add.title,
          description: bot_add.description,
          content: bot_add.content,
        },
        success(resp) {
          if (resp.error_message === "success") {
            bot_add.title = ""
            bot_add.description = ""
            bot_add.content = ""
            Modal.getInstance("#add-bot-modal").hide()
            refresh_bots()
          } else {
            bot_add.error_message = resp.error_message
          }
        }
      })
    }

    const remove_bot = (bot) => {
      $.ajax({
        url: "https://app2711.acapp.acwing.com.cn/api/user/bot/remove/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.token
        },
        data: {
          bot_id: bot.id
        },
        success(resp) {
          if (resp.error_message === "success") {
            refresh_bots()
          }
        }
      })
    }

    const update_bot = (bot) => {
      $.ajax({
        url: "https://app2711.acapp.acwing.com.cn/api/user/bot/update/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.token
        },
        data: {
          bot_id: bot.id,
          title: bot.title,
          description: bot.description,
          content: bot.content,
        },
        success(resp) {
          if (resp.error_message === "success") {
            Modal.getInstance('#update-bot-modal-'+bot.id).hide()
            refresh_bots()
          } else {
            bot.error_message = resp.error_message
          }
        }
      })
    }

    refresh_bots()

    return {
      bots, bot_add,
      add_bot, remove_bot, update_bot
    }
  }
}
</script>

<style scoped>
div.error-message {
  color: red;
}
/*.table>tbody>tr {*/
/*  height: 10vh;*/
/*}*/
.table>tbody>tr>td {
  line-height: 6vh;
}
</style>