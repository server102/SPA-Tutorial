<template>
  <div id="app">
    <div class="columns">
    <div class="column is-narrow">
      <VerticalNav v-if="isUserLoggedIn" />
    </div>
    <div class="column">
    <AdminHeader v-if="isUserLoggedIn">
    </AdminHeader>
    <div class="content">
      <router-view/>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/dashboard/AdminHeader.vue'
import VerticalNav from '@/components/dashboard/VerticalNav.vue'

export default {
  computed: {
    isUserLoggedIn () {
      return this.$store.state.isUserLoggedIn
    }
  },
  components: {
    AdminHeader,
    VerticalNav
  }
}
</script>
