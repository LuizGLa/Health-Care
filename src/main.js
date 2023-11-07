import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CLIENT_ID } from './dataClient'
import * as ConfirmDialog from 'vuejs-confirm-dialog'
import './registerServiceWorker'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}

createApp(App)
  .use(store)
  .use(ConfirmDialog)
  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID
  })
  .use(router)

  .mount('#app')
