<template>
  <div class="columns">
    <div class="column is-one-third is-offset-one-third register">
      <section>
        <h1>Let's create your account</h1>
        <p>Already have an eTrade account? Sign in</p>
        <b-field label="Name *" v-bind:type="isNameValid" v-bind:message="nameError">
          <b-input v-model="name" type="text"></b-input>
        </b-field>
        <b-field label="Email *" v-bind:type="isEmailValid" v-bind:message="emailError">
          <b-input v-model="email"  type="email" placeholder="example@example.com"></b-input>
        </b-field>
        <b-field label="Password *" v-bind:type="isPasswordValid" v-bind:message="passwordError">
          <b-input v-model="password" type="password" password-reveal></b-input>
        </b-field>
        <b-field>
            <b-checkbox v-model="toggle_state" type="is-info"><span class="register_terms">I agree to eTrade's <a href="#">Terms</a> and <a href="#">Privacy Policy</a></span></b-checkbox>
        </b-field>
        <a :disabled="toggle_state === false" class="button is-success is-hovered is-active is-fullwidth form-button" @click="register">Register</a>
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

      emailError: null,
      passwordError: null,
      isEmailValid: null,
      isPasswordValid: null,
      nameError: null,
      isNameValid: null
    }
  },
  methods: {
    async register () {
      if (!this.toggle_state) return // prevent form submission if privacy checkbox is not clicked

      this.clearFormErrorView()
      try {
        const result = await AuthService.register({
          name: this.name,
          email: this.email,
          password: this.password
        })
        if (result.status === 200) {
          console.log('welcome to the dashboard')
          this.clearFormInput()
        }
      } catch (err) {
        switch (err.response.data.inputType) {
          case 'name':
            this.nameError = err.response.data.error
            this.isNameValid = 'is-danger'
            break

          case 'email':
            this.emailError = err.response.data.error
            this.isEmailValid = 'is-danger'
            break

          case 'password':
            this.passwordError = err.response.data.error
            this.isPasswordValid = 'is-danger'
            break

          default:
        }
      }
    },
    clearFormErrorView () {
      this.nameError = this.isNameValid = this.emailError = this.isEmailValid = this.passwordError = this.isPasswordValid = null
    },
    clearFormInput () {
      this.name = this.email = this.password = ''
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
