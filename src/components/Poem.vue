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
          <canvas id="toneAnalysisChart" width="400" height="400">
          </canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {EventBus} from './event-bus.js'
  import axios from 'axios'
  import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'
  let analyzedPoem1 = {}
  import Chart from 'chartjs'

  EventBus.$on('poemRequested', function (poem) {
    let lines = poem.lines
    lines.forEach(line => {
      line = line.replace(/"/g, '')
    })
    analyzedPoem1 = poem
    getToken().then(analyze)
  })

  // function used in method on line 94. required to get auth token from Watson API
  function getToken () {
    return axios.get('/api/token/tone_analyzer')
    .then(response => {
      return response.data
    })
  }
  // function used in method on line 94 after getToken is called.
  // uses poemRequest to process tone analysis. Assigns result to tone
  let toneResult = {}
  function analyze (token) {
    const toneAnalyzer = new ToneAnalyzerV3({
      token: token,
      version_date: '2016-05-19'
    })
    toneAnalyzer.tone(
      {
        text: analyzedPoem1.lines,
        sentences: false
      },
      function (err, tone) {
        if (err) {
          // output.innerHTML = err;
          return console.log(err)
        }
        let data = tone
        toneResult = data.document_tone.tone_categories[0].tones
        console.log(toneResult)
      }
    )
  }
  // create Chart
  let ctx = 'toneAnalysisChart'
  let toneAnalysisChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
})

  export default {
    name: 'poem',
    data () {
      return {
        analyzedPoem: analyzedPoem1,
        tone: toneResult,
        chart: toneAnalysisChart
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
