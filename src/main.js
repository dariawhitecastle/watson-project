// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
// import LanguageTranslatorV2 from 'watson-developer-cloud/language-translator/v2'
// import fs from 'fs'

Vue.config.productionTip = false
Vue.use(Axios)
// Vue.use(LanguageTranslatorV2)
// Vue.use(fs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
