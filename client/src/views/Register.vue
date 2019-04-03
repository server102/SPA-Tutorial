<template>
  <div class="register">
    <h1>This is the register page </h1>
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
      result: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthService.register({
        email: this.email
      })
      console.log(response.data)
    }
  }
}
</script>
<style scoped>
</style>
