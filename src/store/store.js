import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {errHandler} from "../js/utils";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state: {
        session: null,
        users: null,
        groups: null,
        root: null,
    },
    mutations: {
        setSession: function (state, p) {
            state.session = p;
        },
        setUsers: function (state, p) {
            state.users = p;
        },
        setRoot: function (state, p) {
            state.root = p;
        },
        setGroups: function (state, p) {
            state.groups = p;
        }
    },
    actions: {
        loadUsers: function ({commit, state}) {
            axios.get('users', {params: {session: state.session}})
            .then(r => commit('setUsers', r.data))
            .catch(errHandler)
        },
        loadGroups: function ({commit, state}) {
            axios.get('groups', {params: {session: state.session}})
            .then(r => commit('setGroups', r.data))
            .catch(errHandler)
        },
        createGroup: function ({commit, state}, data) {
            axios.post('groups/create',{}, {
                params: {session: state.session, ...data}
            })
            .then(() => commit('setGroups', null))
            .catch(errHandler)
        }
    }
});
