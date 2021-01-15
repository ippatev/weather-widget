import Vue from 'vue'
import App from './App.vue'
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'
import Vuent from 'vuent'
import './assets/main.scss'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(vueCustomElement)
Vue.use(Vuent)

Vue.customElement('weather-widget', App)

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
