<template>
  <div class="poem">
    <ul>
      <router-link to="/" tag="li"><a>Home</a></router-link>
      <router-link to="/search" tag="li"><a>Search for poem</a></router-link></li>
      <router-link to="/poem" tag="li"><a>See poem</a></router-link></li>
    </ul>
    <div class="mdl-grid">
      <div class="mdl-card mdl-shadow--4dp mdl-cell--5-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">{{ analyzedPoem.title }}<br>{{ analyzedPoem.author }}</h2>
        </div>
        <div class="mdl-card__supporting-text"><p v-for="line in analyzedPoem.lines">
        {{ line }} </p>
        </div>
      </div>
      <div class="mdl-card mdl-shadow--4dp mdl-cell--5-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">Poem Title<br>Poem Author</h2>
        </div>
        <div class="mdl-card__supporting-text">
          <polar-chart :chart-data="chartData"></polar-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {getPoem} from './PoemManager.js'
  import axios from 'axios'
  import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'
  let analyzedPoem1 = {}
  import PolarChart from './PolarChart.js'

  // required to get auth token from Watson API
  function getToken () {
    return axios.get('/api/token/tone_analyzer')
    .then(response => {
      return response.data
    })
  }
  // uses analyzedPoem1 to process tone analysis. Assigns result to tone
  let toneResult = {}
  let chartData = {
    labels: [],
    data: []
  }

  function createDataObject (data) {
      data.forEach(obj => {
      chartData.labels.push(obj.tone_name)
      chartData.data.push(Math.round(obj.score * 100))
    })
    return chartData
  }

  function analyze (token, analyzedPoem1) {
    const toneAnalyzer = new ToneAnalyzerV3({
      token: token,
      version_date: '2016-05-19'
    })
    return new Promise ((res, rej) => {
      toneAnalyzer.tone(
        {
          text: analyzedPoem1.lines,
          sentences: false
        },
        function (err, tone) {
          if (err) {
            // output.innerHTML = err;
            return rej(err)
          }
          toneResult = tone.document_tone.tone_categories[0].tones
          return res(createDataObject(toneResult))
        }
      )
    })
  }

  export default {
    name: 'poem',
    components: {
      PolarChart
    },
    mounted () {
      const poem = getPoem()
      console.log(poem)
      let lines = poem.lines
      lines.forEach(line => {
        line = line.replace(/"/g, '')
      })
      this.analyzedPoem = poem
      getToken()
      .then(token => analyze(token, poem))
      .then(chartData => this.chartData = {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      })
      .catch(err => console.log(err))
    },
    data () {
      return {
        analyzedPoem: {},
        chartData: {
          labels: {},
          datasets: [{
            data: {}
          }]
        }
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
