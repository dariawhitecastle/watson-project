import { PolarArea, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default PolarArea.extend({
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.ChartData, {
      rsponsive: true,
      maintainAspectRation: false
    })
  }
})
