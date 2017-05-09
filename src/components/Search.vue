<template>
  <div class="search">
    <ul>
      <li>Home</li>
      <li>See poem</li>
      <li>Start over</li>
    </ul>
    <div class="mdl-grid">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone mdl-cell--4-offset-desktop mdl-cell--1-offset-tablet">
          <input class="mdl-textfield__input" type="text" id="search-poem" pattern="[A-Z,a-z, ]*" v-model="searchValue">
          <label class="mdl-textfield__label" for="search-poem">Search by title or author</label>
          <span class="mdl-textfield__error">Letters and spaces only</span>
      </div>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="searchPoem()">
        Search
      </button>
      <div v-for="poem in poems" class="mdl-card mdl-shadow--4dp mdl-cell--6-col mdl-cell--6-col-tablet mdl-cell--12-col-phone mdl-cell--3-offset-desktop mdl-cell--1-offset-tablet">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">{{ poem.title }}<br>{{ poem.author }}</h2>
        </div>
        <div class="mdl-card__supporting-text" v-for="line in poem.lines"> {{ line }} </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'search',
  data () {
    return {
      searchValue: '',
      poems: []
    }
  },
  methods: {
    searchPoem: function () {
      axios.get(`https://galvanize-cors-proxy.herokuapp.com/poetrydb.org/author/${this.searchValue}`)
      .then(response => {
        let poems = response.data
        poems.forEach(poem => {
          let lines = poem.lines
          lines.forEach(line => {
            line = line.replace(/"/g, '')
          })
        })
        this.poems = poems
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mdl-grid {
  text-align: center;
}
.mdl-card {
  margin-top: 20px;
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
