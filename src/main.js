import Vue from 'vue'
import App from './App.vue'

// 导入router
import router from '@/router/router.js';


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
