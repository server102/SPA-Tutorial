import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

Vue.use(Buefy)

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
