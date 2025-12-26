import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'

import { firebaseApp } from './firebaseConfig'
import { VueFire } from 'vuefire'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp
})

app.mount('#app')
