import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import store from '@/store'
import SERVER_PATH from './config'
import Color from './Color'
import Color2 from './Color2'
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.SERVER_PATH = SERVER_PATH
Vue.prototype.colorCard = Color
Vue.prototype.Colors = Color2
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')