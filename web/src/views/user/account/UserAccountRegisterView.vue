<template>
  <my-card class="container mt-3">
    <div class="row justify-content-md-center">
      <my-card class="col col-md-auto m-4">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">确认密码</label>
            <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword">
          </div>
          <div class="error-message">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-primary w-100">注册</button>
        </form>
      </my-card>
    </div>
  </my-card>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "UserAccountRegisterView",
  components: {MyCard},

  setup() {
    let username = ref('')
    let password = ref('')
    let confirmedPassword = ref('')
    let errorMessage = ref('')
    const store = useStore()

    const register = () => {
      errorMessage = ''
      store.dispatch("register", {
            username: username.value,
            password: password.value,
            confirmedPassword: confirmedPassword.value,
            success() {
              console.log("register success")
              alert("注册成功！")
            },
            error() {
              alert("注册失败！")
              console.log("register failed")
            }
          }
      )
    }

    return {username, password, confirmedPassword, errorMessage, register}
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>