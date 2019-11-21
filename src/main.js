import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import store from './store/store';

axios.defaults.baseURL = 'http://127.0.0.1:1337/';
Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
