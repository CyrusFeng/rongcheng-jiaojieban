// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import rem from './rem'
import './reset.css'

rem()

Vue.config.productionTip = false
Vue.prototype.$remove = function remove(arr, val) {
  if (val instanceof Object && val.id) {
    let index = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == val.id) index = i;
    }
    arr.splice(index, 1);
  }
  return arr
}
Vue.prototype.$controlLength = function (str, len) {
  return str.length > 6 ? str.slice(0, len) + '...' : str
}
Vue.prototype.$url = {
  // domain:'192.168.1.106',
  domain:'111.160.97.27',
  // domain:'localhost',
  port:'8081'
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})



