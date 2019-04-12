<template>
  <div class="columns">
    <div class="column is-one-third is-offset-one-third register">
      <section>
        <form @submit.prevent="register">
          <h1>Let's create your account</h1>
          <p>Already have an eTrade account? <router-link to="/login">Sign in</router-link></p>
          <b-notification v-if="error" type="is-danger" v-bind:closable="false">
            {{ error }}
        </b-notification>
          <b-field label="Name *">
            <b-input v-model="name" type="name"></b-input>
          </b-field>
          <b-field label="Email *">
            <b-input v-model="email"  type="email" placeholder="example@example.com"></b-input>
          </b-field>
          <b-field label="Password *">
            <b-input v-model="password" type="password" password-reveal></b-input>
          </b-field>
          <b-field>
              <b-checkbox v-model="toggle_state" type="is-info"><span class="register_terms">I agree to eTrade's <a href="#">Terms</a> and <a href="#">Privacy Policy</a></span></b-checkbox>
          </b-field>
          <button type="submit" :class="isBtnLoading" :disabled="toggle_state === false" class="button is-success is-hovered is-active is-fullwidth form-button">Register</button>
        </form>
      </section>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      toggle_state: false,
      is_register_btn_disabled: true,
      isBtnLoading: '',
      error: null
    }
  },
  methods: {
    async register () {
      if (!this.toggle_state) return
      try {
        this.clearErrorMsg()
        this.showLoadingState()
        const result = await AuthService.register({
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.redirectToDashboard(result.data.token, result.data.user)
      } catch (err) {
        this.handleFormError(err.response.data.error)
      }
      this.hideLoadingState()
    },
    redirectToDashboard (token, user) {
      this.$store.dispatch('setToken', token)
      this.$store.dispatch('setUser', user)
      this.clearFormInput()
      this.$router.push({
        name: 'dashboard'
      })
    },
    handleFormError (err) {
      // const msg = 'Error connecting to server, please try again'
      this.error = err
    },
    clearFormInput () {
      this.name = this.email = this.password = ''
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
