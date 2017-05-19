import { PolarArea, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default PolarArea.extend({
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    // if (this._chart !== null || this._chart !== undefined) {
    //   this._chart.destroy()
    // }
    this.renderChart(this.ChartData, {
      rsponsive: true,
      maintainAspectRation: false
    })
  }
})
