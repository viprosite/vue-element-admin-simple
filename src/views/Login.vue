<template>
  <div class="login-container">
    username: <input v-model="loginForm.username">
    password: <input v-model="loginForm.password">
    <button @click="handleLogin">login</button>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'gNk/Tan3/mPg0S95Jdwxcg=='
      }
    }
  },
  methods: {
    ...mapActions(['loginFn', 'getUserInfo']),
    async handleLogin() {
      const token = await this.loginFn(this.loginForm)
      if (token) {
        const info = await this.getUserInfo(token)
        console.log(info)
        if (info.id) {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container{

}
</style>
