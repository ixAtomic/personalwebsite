import {createApp} from 'vue';
import App from './App.vue'
import router from "./router"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './css/main.css'

library.add(faFile)
library.add(faBars)
library.add(faMinusCircle)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
