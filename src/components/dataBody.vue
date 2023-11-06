<template>
<div class="group">
    <h2 id="nameData">{{ nameValue }}</h2>
    <h2>{{ dataValue }}</h2>
    <h3>{{ description }}</h3>
</div>
</template>
<script setup>
/* eslint-disable no-unused-vars */
 const props = defineProps({
   nameValue: String,
   dataValue: String,
   description: String
 })
</script>
<style scoped>


h2,h3{
    font-size: 0.8em

}

@media (max-width: 767px) {
  h2,h3 {
    margin-left: 0;
}

}
.group {
    display: flex;

}

h3 {
    margin-left: 0.2em;
}

#nameData{
    margin-right: 0.2em;
    font-weight: bold;
}
</style>
