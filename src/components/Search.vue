<template>
  <div class="search">
    <ul>
      <router-link to="/" tag="li"><a>Home</a></router-link>
      <router-link to="/search" tag="li"><a>Search for poem</a></router-link></li>
      <router-link to="/poem" tag="li"><a>See poem</a></router-link></li>
    </ul>
    <div v-show="showMessage"><p>{{ message }}</p>
    </div>
    <div class="mdl-grid">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--4-col mdl-cell--6-col-tablet mdl-cell--12-col-phone mdl-cell--4-offset-desktop mdl-cell--1-offset-tablet">
          <input class="mdl-textfield__input" type="text" id="search-poem" pattern="[A-Z,a-z, ]*" v-model="searchValue">
          <label class="mdl-textfield__label" for="search-poem">Search by title or author</label>
          <span class="mdl-textfield__error">Letters and spaces only</span>
      </div>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" v-on:click="searchPoem()">
        Search
      </button>
      <div v-for="(poem, index) in poems" class="mdl-card mdl-shadow--4dp mdl-cell--6-col mdl-cell--6-col-tablet mdl-cell--12-col-phone mdl-cell--3-offset-desktop mdl-cell--1-offset-tablet">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">{{ poem.title }} </br>by: {{ poem.author }}</h2>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" v-on:click="analyzePoem(poem)">
          Translate
        </button>
        <div class="mdl-card__supporting-text" v-bind:id="index"><p v-for="line in poem.lines"> {{ line }} </p></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'
import {EventBus} from './event-bus.js'
// let poemRequest = ''
// let toneResult = {}

// // function used in method on line 94. required to get auth token from Watson API
// function getToken () {
//   return axios.get('/api/token/tone_analyzer')
//   .then(response => {
//     return response.data
//   })
// }
// // function used in method on line 94 after getToken is called.
// // uses poemRequest to process tone analysis. Assigns result to tone
// function analyze (token) {
//   const toneAnalyzer = new ToneAnalyzerV3({
//     token: token,
//     version_date: '2016-05-19'
//   })
//   toneAnalyzer.tone(
//     {
//       text: poemRequest
//     },
//     function (err, result) {
//       if (err) {
//         // output.innerHTML = err;
//         return console.log(err)
//       }
//       toneResult = JSON.stringify(result, null, 2)
//       console.log(toneResult)
//     }
//   )
// }

export default {
  name: 'search',
  data () {
    return {
      searchValue: '',
      showMessage: false,
      poems: [],
      tone: {},
      message: 'Sorry, we do not have your poem at this time'
    }
  },
  methods: {
    searchPoem: function () {
      axios.get(`https://galvanize-cors-proxy.herokuapp.com/poetrydb.org/author/${this.searchValue}`)
      .then(response => {
        if (response.data.status === 404) {
          this.showMessage = true
        }
        let poems = response.data
        poems.forEach(poem => {
          let lines = poem.lines
          lines.forEach(line => {
            line = line.replace(/"/g, '')
          })
        })
        this.poems = poems.length > 5 ? poems.slice(5) : poems
      })
    },
    analyzePoem: function (poem) {
      // let arr = poem.lines
      // poemRequest = arr.slice(0, arr.length-1).join(' ')
      this.poem = poem
      // getToken().then(analyze)
      this.$router.replace({ name: 'Poem' })
      EventBus.$emit('poemRequested', this.poem)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mdl-grid {
  text-align: center;
}
.mdl-card__title-text {
  margin-top: 20px;
}
.mdl-card {
  margin-top: 20px;
  align-items: center;
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
