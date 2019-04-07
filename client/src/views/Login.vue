<template>
  <div class="columns">
    <div class="column is-one-third is-offset-one-third register">
      <section>
        <h1>Log in to eTrade</h1>

        <b-notification v-if="error" type="is-danger" v-on:close="reset_error_alert">
            {{ error }}
        </b-notification>

        <b-field label="Email *">
          <b-input v-model="email"  type="email" placeholder="example@example.com"></b-input>
        </b-field>
        <b-field label="Password *">
          <b-input v-model="password" type="password" password-reveal></b-input>
        </b-field>
        <a class="button is-success is-hovered is-active is-fullwidth form-button" @click="login">Log in</a>
        <p>Forgot your password? <a href="#">Reset</a></p>
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </section>
    </div>
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
    async login () {
      try {
        const result = await AuthService.login({
          email: this.email,
          password: this.password
        })
        if (result.status === 200) {
          console.log('welcome to the dashboard')
          this.$store.dispatch('setToken', result.data.token)
          this.$store.dispatch('setUser', result.data.user)
        }
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    reset_error_alert () {
      this.error = null
    }
  }
}
</script>
<style>
.field {
  text-align: left;
}
.label {
  font-weight: normal;
}

.register_terms {
  font-size: .75rem;
}

</style>
