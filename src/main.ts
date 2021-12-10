/*
 * @Description:
 * @Author: gaoyunpeng
 * @Date: 2021-10-18 09:19:05
 * @LastEditors: gaoyunpeng
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import { CoreMap, Messure, Draw, PopInfo, Popup, Select, Swipe, LayerStyle, Legend, Flight, Flow, Trackline } from 'core-map';
// Vue.use(CoreMap);
// Vue.use(Messure);
// Vue.use(Draw);
// Vue.use(PopInfo);
// Vue.use(Popup);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
