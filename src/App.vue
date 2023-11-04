<template>
  <router-view/>
  <VLibras />
  <div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-image: url('../src/assets/imgs/Background.jpg');
}
</style>
<script>

export default {
  name: 'App',
  mounted () {
    this.vlibras = new window.VLibras.Widget('https://vlibras.gov.br/app')
  }

}
</script>
