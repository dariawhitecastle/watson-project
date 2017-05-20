<template>
  <div class="poem">
    <ul>
      <router-link to="/" tag="li"><a>Home</a></router-link>
      <router-link to="/search" tag="li"><a>Search for poem</a></router-link></li>
      <router-link to="/poem" tag="li"><a>See poem</a></router-link></li>
    </ul>
    <div class="mdl-grid">
      <div class="mdl-card mdl-shadow--4dp mdl-cell--5-col mdl-cell--5-col-tablet mdl-cell--12-col-phone">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">{{ analyzedPoem.title }}<br>{{ analyzedPoem.author }}</h2>
        </div>
        <div class="mdl-card__supporting-text"><p v-for="line in analyzedPoem.lines">
        {{ line }} </p>
        </div>
      </div>
      <div class="mdl-card mdl-shadow--4dp mdl-cell--5-col mdl-cell--5-col-tablet mdl-cell--12-col-phone">
        <div class="mdl-card__title">
           <h2 class="mdl-card__title-text">Tone Analyzer<br>by IBM Watson</h2>
        </div>
        <div class="mdl-card__supporting-text">
          <polar-chart :chart-data="chartData"></polar-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPoem, getToken, createDataObject, analyze} from './PoemManager.js'
  import PolarChart from './PolarChart.js'

  export default {
    name: 'poem',
    components: {
      'polar-chart': PolarChart
    },
    mounted () {
      const poem = getPoem()
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
            'rgba(242, 64, 103, 1)',
            'rgba(6, 146, 239, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(248, 232, 58, 1)',
            'rgba(114, 45, 251, 1)'
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
          labels: [],
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
.mdl-grid {
  justify-content: space-around;
}
.mdl-card {
  margin: 20px;
}
.mdl-card__title {
  justify-content: space-around;
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
