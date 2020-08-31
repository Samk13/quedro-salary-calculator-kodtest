import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import store from './store'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
