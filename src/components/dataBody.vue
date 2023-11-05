<template>

<div class="group">
    <h2 id="nameData">{{ nameValue }}</h2>
    <h2>{{ dataValue }}</h2>
    <h2>{{ description }}</h2>
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
.group {
    display: flex;
    
}

h2{
    font-size: 1.0em;
}

#nameData{
    margin-right: 0.2em;
    font-weight: bold;
}
</style>