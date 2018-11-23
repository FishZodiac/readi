import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import App from './App';
import router from './router';
import store from './store';
const X2JS = require('x2js');
// import mixins from './common/mixin';
Vue.mixin({
  methods: {
    fnXml2json(xmlText) {
      const x2js = new X2JS();
      return x2js.xml2js(xmlText);
    },
  },
});

Vue.use(Buefy);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
