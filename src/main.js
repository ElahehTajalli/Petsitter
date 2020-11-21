import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import Loading from './mixins/Loading'
import router from './router'
import { store } from './store'
import locale from './locale/element/lang/fa.js'
import { messages } from './locale/index.js'

Vue.use(VueI18n)
Vue.use(ElementUI, { locale })
Vue.mixin(Loading)

const i18n = new VueI18n({
  locale: 'fa',
  messages
})

Vue.config.productionTip = false

localStorage.removeItem('server_access_token')
// End Router interceptors
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')