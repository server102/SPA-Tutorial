<template>
  <div class="columns">
    <div class="column is-one-third is-offset-one-third register">
      <section>
        <h1>Log in to eTrade</h1>

        <b-notification v-if="error" type="is-danger"  v-bind:closable="false">
            {{ error }}
        </b-notification>
        <form @submit.prevent="login">
        <b-field label="Email *">
          <b-input v-model="email"  type="email" placeholder="example@example.com"></b-input>
        </b-field>
        <b-field label="Password *">
          <b-input v-model="password" type="password" password-reveal></b-input>
        </b-field>
        <button :class="isBtnLoading" class="button is-success is-hovered is-active is-fullwidth form-button" type="submit">Log in</button>
        </form>
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
      isBtnLoading: '',
      error: null
    }
  },
  methods: {
    getUserName () {
      return this.email.substring(0, this.email.lastIndexOf('@'))
    },
    async login () {
      try {
        this.clearErrorMsg()
        this.showLoadingState()
        const result = await AuthService.login({
          email: this.email,
          password: this.password
        })
        if (result.status === 200) {
          console.log('welcome to the dashboard')
          this.$store.dispatch('setToken', result.data.token)
          this.$store.dispatch('setUser', result.data.user)
          this.$router.push({
            name: 'dashboard'
          })
        }
      } catch (err) {
        this.error = err.response.data.error
      }
      this.hideLoadingState()
    },
    showLoadingState () {
      this.isBtnLoading = 'is-loading'
    },
    hideLoadingState () {
      this.isBtnLoading = ''
    },
    clearErrorMsg () {
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
