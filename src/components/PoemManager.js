import axios from 'axios'
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'

let _poem = null

export function getPoem() {
  return _poem
}

export function setPoem(poem) {
  _poem = poem
}

// required to get auth token from Watson API
export function getToken () {
  return axios.get('/api/token/tone_analyzer')
  .then(response => {
    return response.data
  })
}
// uses analyzedPoem1 to process tone analysis. Assigns result to tone

export function createDataObject (data) {
  let chartData = {
    labels: [],
    data: []
  }
  data.forEach(obj => {
    chartData.labels.push(obj.tone_name)
    chartData.data.push(Math.round(obj.score * 100))
  })
  return chartData
}

export function analyze (token, analyzedPoem) {
  const toneAnalyzer = new ToneAnalyzerV3({
    token: token,
    version_date: '2016-05-19'
  })
  return new Promise((resolve, reject) => {
    toneAnalyzer.tone(
      {
        text: analyzedPoem.lines,
        sentences: false
      },
      function (err, tone) {
        if (err) {
          return reject(err)
        }
        var toneResult = tone.document_tone.tone_categories[0].tones
        return resolve(createDataObject(toneResult))
      }
    )
  })
}
