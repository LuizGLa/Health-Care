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
  <div class="d-flex row justify-content-center" style="margin: 0;">
    <div class=" cardAll d-flex flex-column justify-content-center">
      <div class="box">
        <DialogsWrapper />
        <button class="infoDialog" @click="useConfirmBeforeAction"><i class="fa-solid fa-circle-info"></i> info</button>
      </div>
      <div class="cardUserInfo d-flex">
        <div v-if="user" style="margin-left: 1.2em;">
          <div class="boxImgUser">
            <img class="userImg rounded-circle " :src="user.picture"/>
          </div>
          <div class="boxNameUser">
            <h2>{{ user.name }}</h2>
          </div>
        </div>
        <div class="dataBody row row-cols-2">
          <div>
            <dataBody nameValue="Peso:" :dataValue="weight" description="kg"></dataBody>
          </div>
          <div>
            <dataBody nameValue="Altura:" :dataValue="height" description="m"></dataBody>
          </div>
          <div>
            <dataBody nameValue="Idade:" :dataValue="age" description="anos"></dataBody>
          </div>
          <div>
           <dataBody nameValue="TMB:" :dataValue="basalRate" description="kcal"></dataBody>
          </div>
          <div>
            <dataBody nameValue="Gênero:"  :dataValue="gender"></dataBody>
          </div>
        </div>
      </div>
      <div class="boxCard">
          <label id="info">Informações diárias</label>
        <div class="teste">
        <div class="groupData row row-cols-2">
        <div class="col">
          <div class="d-flex justify-content-center">
            <dataTypes nameValue="Passos:" :dataValue="steps" classIcon="fas fa-shoe-prints"></dataTypes>
          </div>
        </div>
        <div class="col">
          <div class="d-flex justify-content-center">
            <dataTypes nameValue="Move min:" :dataValue="moveMinutes" classIcon="fas fa-running" description="min" ></dataTypes>
          </div>
        </div>
        <div class="col">
          <div class="d-flex justify-content-center">
            <dataTypes nameValue="Distância:" :dataValue="distance" classIcon="fas fa-road" description="mi"></dataTypes>
          </div>
        </div>
        <div class="col">
          <div class="d-flex justify-content-center">
            <dataTypes nameValue="Calorias:" :dataValue="calories" classIcon="fas fa-fire" description="kcal"></dataTypes>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>


<script setup>
import router from '@/router'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import dataTypes from '@/components/dataTypes.vue'
import dataBody from '@/components/dataBody.vue'
import { basalRateCalculator, conversionDateForAge } from '@/functions_user/functions_utils.js'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import dialogInfo from '../components/dialogInfo.vue'

const user = ref(null)
const loggedIn = ref(false)
const steps = ref(0)
const moveMinutes = ref(0)
const distance = ref(0)
const calories = ref(0)
const weight = ref(0)
const height = ref(0)
let dateReturn = ref(null)
let dateBirth = ref(null)
const yearBirth = ref(null)
const month = ref(null)
const day = ref(null)
const age = ref(0)
const gender = ref(null)
const basalRate = ref(0)
const token = sessionStorage.getItem('accessToken')

const conversionGenderForBr = async (gender) => {
  gender.value = gender.value === 'Male' ? 'Masculino' : 'Feminino';
}

const fetchData = async () => {
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    user.value = response.data;
    loggedIn.value = true;
    const data = await axios.get('https://people.googleapis.com/v1/people/me?personFields=birthdays,genders', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    dateReturn.value = data.data.birthdays[0].date;
    gender.value = data.data.genders[0].formattedValue;
    yearBirth.value = dateReturn.value.year;
    month.value = dateReturn.value.month - 1;
    day.value = dateReturn.value.day;
    dateBirth.value = new Date(yearBirth.value, month.value, day.value);
  } catch (error) {
    console.error(error);
  }
  try {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60 * 1000;
    const startTimeMillis = now.setHours(0,0,0,0) + offset;
    const endOfDay = new Date();
    const endTimeMillis = endOfDay.setHours(23,59,59,999) + offset;

    const response = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      aggregateBy: [{
        dataTypeName: 'com.google.step_count.delta',
        dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
      }, {
        dataTypeName: 'com.google.active_minutes',
        dataSourceId: 'derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes',
      },
      {
        dataTypeName: 'com.google.distance.delta',
        dataSourceId: 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta',
      },
      {
        dataTypeName: 'com.google.calories.expended',
        dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended',
      },
      {
        dataTypeName: 'com.google.weight.summary',
        dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight',
      },
      {
        dataTypeName: 'com.google.height',
        dataSourceId: 'derived:com.google.height:com.google.android.gms:merge_height',
      }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: startTimeMillis,
      endTimeMillis: endTimeMillis,
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data)
    if (response.data.bucket[0].dataset[0].point.length > 0) {
      steps.value = response.data.bucket[0].dataset[0].point[0].value[0].intVal;
    }
    if (response.data.bucket[0].dataset[1].point.length > 0) {
      moveMinutes.value = response.data.bucket[0].dataset[1].point[0].value[0].intVal;
    }
    if (response.data.bucket[0].dataset[2].point.length > 0) {
      distance.value = (response.data.bucket[0].dataset[2].point[0].value[0].fpVal * 0.000621371).toFixed(2);
    }
    if (response.data.bucket[0].dataset[3].point.length > 0) {
      calories.value = response.data.bucket[0].dataset[3].point[0].value[0].fpVal.toFixed(2);
    }
    if (response.data.bucket[0].dataset[4].point.length > 0) {
      weight.value = response.data.bucket[0].dataset[4].point[0].value[0].fpVal.toFixed(2);
    }
    if (response.data.bucket[0].dataset[5].point.length > 0) {
      height.value = response.data.bucket[0].dataset[5].point[0].value[0].fpVal.toFixed(2);
    }
  } catch (error) {
    console.error('Erro:', error);
  }
  age.value = await conversionDateForAge(yearBirth.value);
  basalRate.value = (await basalRateCalculator(age.value, height.value, gender.value, weight.value)).toFixed(0)
};

onMounted(async () => {
  await fetchData();
  conversionGenderForBr(gender);
});


const useConfirmBeforeAction = (props) => {
  const { reveal} = createConfirmDialog(dialogInfo, props)

  reveal()
}


const logout = () => {
  sessionStorage.removeItem('accessToken');
  user.value = null;
  loggedIn.value = false;
  router.push('/');
};

</script>

<style scoped>
.cardAll {
  height: 80vh;
  width: 80vh;
  margin: 1.0em;
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
.logout, .infoDialog {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 10px rgba(6, 40, 133, 0.26);
  font-weight: bold;
  border: none;
  color: rgb(9, 80, 112);
  padding: 0.5em;
  transition: 0.5s;
  font-size: 0.9em;
}

.logout{
  margin-right: 1.5em;
}
.infoDialog {
  width: 5em;
  margin-bottom: 0.9em;
}
.infoDialog:hover{
  width: 7em;
  margin-bottom: 0.9em;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(1deg, #feffff 0%, #edf6fff8 100%);
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 0px 3px 15px rgba(6, 40, 133, 0.13);
}
.dataBody {
 margin-left: 3.0em;
 margin-top: 1.0em;
}
@media only screen and (max-width: 767px) {
  .dataBody {
  margin-left: 0.1em;
  font-size: 0.9em;
}

#info {
 font-size: small;
}
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
