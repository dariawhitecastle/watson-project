<template>
  <div class="home">
    <ul>
      <router-link to="/" tag="li"><a>Home</a></router-link>
      <router-link to="/search" tag="li"><a>Search for poem</a></router-link>
      <router-link to="/poem" tag="li"><a>See poem</a></router-link>
    </ul>
    <h2>{{ msg }}</h2>
    <div class="mdl-grid">
      <div class="mdl-cell--8-col mdl-cell--12-col-phone mdl-cell--2-offset-desktop">
        <p>The app allows you to search for a poem by title or author name, then select
          a poem for tone and emotion analysis. We used Poetrydb.org and Watson IBM Tone Analyser
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
      msg: 'Welcome to Poetry Tone Analyzer'
    }
  }
}
</script scoped>

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

li.router-link-active {
  color: blue;
}

a {
  color: #42b983;
  text-decoration: none;
}
</style>
