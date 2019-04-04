<template>
  <div class="register">
    <h1>This is the register page </h1>
    <div v-html="error" />
    <input v-model="email" type="email" name="email" placeholder="Email">
    <input v-model="password" type="password" name="password" placeholder="password">
    <button @click="register">Register</button>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthService.register({
          email: this.email,
          password: this.password
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>
<style scoped>
</style>
