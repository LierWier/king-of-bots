<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>

  <div class="container mt-3">
    <div class="row justify-content-md-center">
      <my-card class="col col-md-auto m-4">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">确认密码</label>
            <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword" placeholder="请再次输入密码">
          </div>
<!--          <div class="error-message">{{ errorMessage }}</div>-->
          <button type="submit" class="btn btn-primary w-100">注册</button>
        </form>
        <div v-if="errorMessage!==''" class="alert alert-danger d-flex align-items-center mt-3" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          <div>
            {{ errorMessage }}
          </div>
          <button type="button" class="btn-close" @click="clear_errorMessage"></button>
        </div>
      </my-card>
    </div>
  </div>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
import {ref} from "vue";
import $ from "jquery";
import router from "@/router";

export default {
  name: "UserAccountRegisterView",
  components: {MyCard},

  setup() {
    let username = ref('')
    let password = ref('')
    let confirmedPassword = ref('')
    let errorMessage = ref('')

    const register = () => {
      errorMessage.value = ''
      $.ajax({
        url: "https://app2711.acapp.acwing.com.cn/api/user/account/register/",
        type: "post",
        data: {
          username: username.value,
          password: password.value,
          confirmedPassword: confirmedPassword.value,
        },
        success(resp) {
          if (resp.error_message === 'success') {
            alert("注册成功！")
            router.push({name: "user_account_login"})
          } else {
            // alert(`${resp.error_message}!`)
            errorMessage.value = resp.error_message
          }
        },
        error() {
          alert("注册失败！")
        }
      })
    }

    const clear_errorMessage = () => {
      errorMessage.value = ''
    }

    return {username, password, confirmedPassword, errorMessage, register, clear_errorMessage}
  }
}
</script>

<style scoped>
/*.error-message {*/
/*  color: red;*/
/*}*/
</style>