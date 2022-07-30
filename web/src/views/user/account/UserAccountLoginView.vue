<template>
  <my-card class="container mt-3">
    <div class="row justify-content-md-center">
      <my-card class="col col-md-auto m-4">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
          </div>
          <div class="error-message">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-primary w-100">登录</button>
        </form>
        <router-link :to="{name: 'user_account_register'}"><button class="btn btn-light w-100 mt-2">去注册</button></router-link>
        <div v-if="errorMessage!==''" class="alert alert-danger d-flex align-items-center mt-3" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          <div>
            {{ errorMessage }}
          </div>
          <button type="button" class="btn-close" @click="clear_errorMessage"></button>
        </div>
      </my-card>
    </div>
  </my-card>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
import {ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";

export default {
  name: "UserAccountLoginView",
  components: {MyCard},

  setup() {
    let username = ref('')
    let password = ref('')
    let errorMessage = ref('')
    const store = useStore()



    const login = () => {
      errorMessage = ''
      store.dispatch("login", {
        username: username.value,
        password: password.value,
        success() {
          console.log("login success")
          store.dispatch("getInfo", {
            success() {
              router.push({ name: 'home' })
            }
          })
        },
        error() {
          console.log("login failed")
        }
      })
    }

    return {username, password, errorMessage, login}
  }
}
</script>

<style scoped>

</style>