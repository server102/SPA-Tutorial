<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <p class="page-title">
      Markets
    </p>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <a class="navbar-item icon-nav" href="#">
        <b-icon
          icon="magnify"
          size="is-medium">
        </b-icon>
      </a>
      <a class="navbar-item icon-nav"  href="#">
        <b-icon
          icon="bell-outline"
          size="is-medium">
        </b-icon>
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Account
        </a>

        <div class="navbar-dropdown is-right">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a @click="logout" class="navbar-item">
            Logout
          </a>
        </div>

      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  methods: {
    logout () {
      console.log('logging out')
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
