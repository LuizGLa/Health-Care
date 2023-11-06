<template>
  <div class="cardData">
    <i :class="classIcon"></i>
    <div class="value">
    <h2> <strong>{{ nameValue }} </strong> <label>{{ dataValue }}</label> <label2>{{ description }}</label2> </h2>
  </div>
  </div>
</template>
<script setup>
/* eslint-disable no-unused-vars */
const props = defineProps({
  nameValue: String,
  dataValue: String,
  classIcon: Object,
  description: String
})
</script>
<style scoped>
.cardData {
box-shadow: 0px 3px 15px rgba(6, 40, 133, 0.13);
border-radius: 20px;
background-color: rgb(255, 255, 255);
width: 15em;
}

h2 {
  font-size: 1.0em;
  padding: 0.5em;
}

.cardData {
  margin: 1.9em;
}

@media (max-width: 767px) {
  h2 {
  font-size: 0.7em;
  padding: 0.5em;
  }
  .cardData {
    width: 9em;
    margin: 0.8em;
    /* scale: 0.9; */
  }
}

i {
  font-size: 1.9em;
  margin-top: 0.5em;
}
</style>
