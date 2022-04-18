import Vue from 'vue'
import App from './App.vue'
import 'animate.css'

import ruleWrap from '@/modules/rule-wrap'
import resultLog from '@/modules/result-log'
Vue.component('rule-wrap', ruleWrap)
Vue.component('result-log', resultLog)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
