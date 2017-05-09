<template>
  <div class="poem">
    <ul>
      <router-link to="/" tag="li"><a>Home</a></router-link>
      <router-link to="/poem" tag="li"><a>See poem</a></router-link></li>
      <router-link to="/search" tag="li"><a>Start over</a></router-link></li>
    </ul>
    </ul>
    <div class="mdl-grid">
      <div class="mdl-card mdl-shadow--4dp mdl-cell--5-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">Poem Title<br>Poem Author</h2>
        </div>
        <div class="mdl-card__supporting-text">
        The Sky Tower is an observation and telecommunications tower located in Auckland,
        New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
        in the Southern Hemisphere.
        </div>
      </div>
      <div class="mdl-card mdl-shadow--4dp mdl-cell--5-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">Poem Title<br>Poem Author</h2>
        </div>
        <div class="mdl-card__supporting-text">
        The Sky Tower is an observation and telecommunications tower located in Auckland,
        New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
        in the Southern Hemisphere.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.mdl-card {
  margin: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
