import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

export const CLIENT_ID = '587860084574-kjlho9on0qfm5fslbhtge6l62k9i0tjj.apps.googleusercontent.com'

createApp(App)
  .use(store)

  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
    scope: [
      'https://www.googleapis.com/auth/fitness.activity.read',
      'https://www.googleapis.com/auth/fitness.activity.write',
      'https://www.googleapis.com/auth/fitness.location.read',
      'https://www.googleapis.com/auth/fitness.location.write',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  })
  .use(router)

  .mount('#app')