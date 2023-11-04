<template>
  <div class="page">
    <div class="groupItems">
      <div class="boxLogo">
        <img class="logo" src="../assets/logos/LogoProj.png">
      </div>
      <button
        @click="login"
        type="button"
        class="btn btn-md"
        style="
    border-radius: 20px;
    box-shadow: 0px 3px 10px rgba(6, 40, 133, 0.26);
    background-color: aliceblue;">
        <img src="../assets/logos/google.svg"> <label>Logar com o google</label>
      </button>
    </div>
  </div>
</template>

<script setup>

import { googleSdkLoaded } from 'vue3-google-login'
import router from '@/router'
import { CLIENT_ID, scope } from '@/dataClient'

const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: scope,
      callback: (response) => {
        const accessToken = response.access_token
        sessionStorage.setItem('accessToken', accessToken)
        router.push('/fitness')
        console.log(response)
      }
    }).requestAccessToken()
  })
}

</script>
<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

}

button:hover {
  scale: 1.03;
  transition: 0.5s;
}

.groupItems {
  padding: 2em;
  background: linear-gradient(20deg, #58ccf0a2 0%, #f1f2f39c 100%);
  border-radius: 20px;
  box-shadow: 0px 3px 15px rgba(6, 40, 133, 0.13);
}

img {
  width: 1.7em;
}

.logo {
  width: 12.9em;
  margin-top: 20px;
}

label {
  font-size: 0.8em;
  margin-left: 2px;
  font-weight: bold;
  color: rgb(6, 52, 83);
}

</style>
