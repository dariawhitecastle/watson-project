<template>
  <div class="home">
    <ul>
      <li>Home</li>
      <li>See poem</li>
      <li>Start over</li>
    </ul>
    <h2>{{ msg }}</h2>
    <div class="mdl-grid">
      <div class="mdl-cell--8-col mdl-cell--12-col-phone mdl-cell--2-offset-desktop">
        <p>The app allows you to search for a poem by title or author name, then select
          a poem for translation and mood analysis. We used Poetrydb.org and Watson IBM Language Translator and Tone Analyser
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Poetry translator'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

div > ul, p{
  font-size: 20px;
}

h1, h2 {
  font-weight: normal;
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
