import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import '@/assets/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('@/assets/img/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
