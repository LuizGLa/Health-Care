import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CLIENT_ID } from './dataClient'

createApp(App)
  .use(store)

  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID
  })
  .use(router)

  .mount('#app')
