<template>
    <div v-if="!session" class="centered">
        <VForm
            title="Авторизуйтесь или создайте нового пользователя"
            handler-title="Авторизоваться"
            :handler="loadSession"
            :fields="[
                {
                    name: 'username',
                    validator: (e) => e.length > 5,
                    placeholder: '(больше 5 симовлов)',
                    label: 'Имя пользователя',
                },
                {
                    name: 'password',
                    validator: (e) => e.length > 6,
                    placeholder: '(больше 6 символов)',
                    label: 'Пароль',
                },
            ]"
        />
    </div>
    <div v-else>
        <Main/>
    </div>
</template>

<script>
    import axios from 'axios';
    import VForm from "./VForm";
    import Main from "./Main";
    import {errHandler} from "../js/utils";
    import {mapState} from "vuex";

    export default {
        name: 'Login',
        components: {
            VForm, Main
        },
        computed: mapState(['session']),
        methods: {
            loadSession: function (data) {
                axios.post('sign_up', {}, {params: {name: data.username, password: data.password}})
                .then(r => this.$store.commit('setSession', r.data.session))
                .catch(errHandler)
            }
        }
    }
</script>

<style scoped>
</style>
