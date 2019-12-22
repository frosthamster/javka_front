import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {errHandler} from "../js/utils";

Vue.use(Vuex);

function mapToObjects(iterable, schema) {
    return iterable.map(obj => {
        if (schema.length !== obj.length)
            throw new Error(`schema is not valid for ${obj}`);

        let result = {};
        for(let [k, v] of  schema.map((e, i) => [e, obj[i]]))
            result[k] = v;

        return result;
    })
}

export function loadFiles(id) {
    let url = 'files/getAvailableFiles';
    let params = {session: store.state.session};
    if (id) {
        url = 'files/getDirectoryContent';
        params['directoryId'] = id;
    }

    return axios.get(url, {params: params})
    .catch(errHandler)
}

const store = new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state: {
        session: null,
        users: null,
        groups: null,
        currentUser: null,
    },
    mutations: {
        setSession: function (state, p) {
            state.session = p;
        },
        setUsers: function (state, p) {
            state.users = p;
        },
        setCurrentUser: function(state, p) {
            state.currentUser = p;
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
        loadCurrentUser: function({commit, state}) {
            axios.get('users/current', {params: {session: state.session}})
            .then(r => commit('setCurrentUser', r.data))
            .catch(errHandler)
        },
        loadGroups: function ({commit, state}) {
            axios.get('groups', {params: {session: state.session}})
            .then(r => commit('setGroups', r.data))
            .catch(errHandler)
        },
        createGroup: function ({dispatch, state}, data) {
            axios.post('groups/create',{}, {
                params: {session: state.session, ...data}
            })
            .then(() => dispatch('loadGroups'))
            .catch(errHandler)
        }
    }
});

export default store;
