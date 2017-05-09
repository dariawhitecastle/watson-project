<template>
  <div id="app">
    <img src="./assets/IBM_Bluemix_logo.svg.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
img {
  height: 300px;
  width: auto;
  margin-bottom: 40px;
}
</style>
