import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFile)
library.add(faBars)
library.add(faMinusCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
