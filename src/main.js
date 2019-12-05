import * as Qs from 'qs';
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import store from './store/store';

export const BASE_URL = 'api/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.paramsSerializer =  function(params) {
    return Qs.stringify(params, {arrayFormat: 'repeat'})
};

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
