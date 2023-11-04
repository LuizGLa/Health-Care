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
h2 {
  font-size: 1.0em;
}

i {
  font-size: 1.9em;
}
.cardData {
  margin: 1.9em;
}
</style>
