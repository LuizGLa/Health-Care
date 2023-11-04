<template>
  <div class="header d-flex justify-content-between align-items-center">
    <div class="d-flex justify-content-center flex-grow-1">
      <img class="logo" src="../assets/logos/LogoProj.png">
    </div>
    <div class="ms-auto">
      <button class="logout" @click="logout">
        Sair
        <i class="fas fa-sign-out"></i>
      </button>
    </div>
  </div>

  <div class="d-flex justify-content-center ">
    <div class=" cardAll d-flex flex-column justify-content-center">
      <div class="cardUserInfo d-flex">
        <div v-if="user" style="margin-left: 1.2em;">
          <div class="boxImgUser">
            <img class="userImg rounded-circle " :src="user.picture"/>
          </div>
          <div class="boxNameUser">
            <h2>{{ user.name }}</h2>
            {{ height }} {{ weight }}
          </div>
        </div>
      </div>
      <div class="boxCard ">
        <div class="bannerInfo">
          <label id="info">Informações diárias</label>
        </div>
        <div class="groupData row row-cols-2 ">
        <div>
          <dataTypes nameValue="Passos:" :dataValue="steps" classIcon="fas fa-shoe-prints"></dataTypes>
        </div>
        <div>
          <dataTypes nameValue="Move min:" :dataValue="moveMinutes" classIcon="fas fa-running" description="min" ></dataTypes>
        </div>
        <div>
          <dataTypes nameValue="Distância:" :dataValue="distance" classIcon="fas fa-road" description="mi"></dataTypes>
        </div>
        <div>
          <dataTypes nameValue="Calorias:" :dataValue="calories" classIcon="fas fa-fire" description="kcal"></dataTypes>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import dataTypes from '@/components/dataTypes.vue'

const user = ref(null)
const loggedIn = ref(false)
const steps = ref(null)
const moveMinutes = ref(null)
const distance = ref(null)
const calories = ref(null)
const height = ref(null)
const weight = ref(null)
const token = sessionStorage.getItem('accessToken')

const getDataFitness = (token) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
    .then((response) => {
      user.value = response.data
      console.log(user.value)
      loggedIn.value = true
    })
    .catch((error) => {
      console.error(error)
    })

  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000

  const startTimeMillis = now.getTime() - offset - 86400000
  const endTimeMillis = now.getTime() - offset + 86400000

  fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      aggregateBy: [{
        dataTypeName: 'com.google.step_count.delta',
        dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
      }, {
        dataTypeName: 'com.google.active_minutes',
        dataSourceId: 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes'
      },
      {
        dataTypeName: 'com.google.distance.delta',
        dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta'
      },
      {
      dataTypeName: 'com.google.calories.expended',
      dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
    },
    {
    dataTypeName: 'com.google.height',
    dataSourceId: 'derived:com.google.height:com.google.android.gms:merge_height'
  },
  {
    dataTypeName: 'com.google.weight.summary',
    dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight'
  }
     ],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: startTimeMillis,
      endTimeMillis: endTimeMillis

    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      steps.value = data.bucket[0].dataset[0].point[0].value[0].intVal
      moveMinutes.value = data.bucket[0].dataset[1].point[0].value[0].intVal
      distance.value = (data.bucket[0].dataset[2].point[0].value[0].fpVal * 0.000621371).toFixed(2)
      calories.value = data.bucket[0].dataset[3].point[0].value[0].fpVal.toFixed(1)
      height.value = data.bucket[0].dataset[4].point[0].value[0].fpVal;
      weight.value = data.bucket[0].dataset[5].point[0].value[0].fpVal
    })
    .catch(error => console.error('Error:', error))
}

const logout = () => {
  sessionStorage.removeItem('accessToken')
  user.value = null
  loggedIn.value = false
  router.push('/')
}
getDataFitness(token)
</script>

<style scoped>
.cardAll {
  height: 80vh;
  width: 80vh;
  margin: 1.3em;
}

label {
  font-size: 0.9em;
  font-weight: bold;
  color: #feffff;
  padding: 0.5em;
  border-radius: 20px;
  margin-top: 0.9em;
  background-color: rgb(9, 80, 112);
}

i{ margin-left: 0.1em;}
.logo {
  width: 6.0em;
  margin-left: 5em;
}
.header {
  background: linear-gradient(1deg, #f7f7f7b4 0%, #ffffffef 100%);
  box-shadow: 0px 5px 10px rgba(6, 40, 133, 0.26);
}
.logout {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 10px rgba(6, 40, 133, 0.26);
  font-weight: bold;
  border: none;
  color: rgb(9, 80, 112);
  padding: 0.5em;
  margin-right: 1.5em;
  transition: 0.5s;
  font-size: 0.9em;
}

.logout:hover {
  scale: 1.03;
  transition: 0.5s;
}
.cardUserInfo{
  max-width: 40em;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: rgb(9, 80, 112);
  color: rgb(255, 255, 255);
}
.boxCard {
  max-width: 40em;
  background: linear-gradient(1deg, #feffff 0%, #edf6fff8 100%);
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 0px 3px 15px rgba(6, 40, 133, 0.13);
}
.userImg {
  width: 4em;
  border: 3px solid rgb(255, 255, 255);
  margin: 0.5em;
}

h2 {
  font-size: 1.0em;
  font-weight: bold;
}

</style>
