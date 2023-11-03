<template>
  <button @click="logout">Logout</button>
  <div v-if="user">
    {{ user.name }}
  </div>
     <h1>Passos Diários</h1>
       <p>{{ steps }}</p>
       <p>{{ moveMinutes }}</p>
       <p>{{ distance }}</p>

</template>

<script setup>
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'

const user = ref(null)
const loggedIn = ref(false)
const steps = ref(null)
const moveMinutes = ref(null)
const distance = ref(null)
const token = sessionStorage.getItem('accessToken')
console.log(token)

const getDataFitness = (token) => {
  axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
    .then((response) => {
      user.value = response.data
      console.log(user.value.name)
      loggedIn.value = true
    })
    .catch((error) => {
      console.error(error)
    })

  const now = new Date('2023-11-03T00:00:00Z')

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

  const startTimeMillis = startOfDay.getTime()
  const endTimeMillis = endOfDay.getTime()

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
      }],
      bucketByTime: { durationMillis: 86400000 }, // Agrupa os dados em intervalos de 1 hora
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
