<template>
    <div class="users">
        <hr>
        <VSpinner v-if="!currentUser"/>
        <div v-else>
            <div>Теущий пользователь:</div>
            <VObj :obj="currentUser"/>
        </div>
        <hr>
        <VSpinner v-if="!users"/>
        <div v-else-if="users.length">
            <div>Все пользователи:</div>
            <div v-for="user in users">
                <br>
                <VObj :obj="user"/>
            </div>
        </div>
        <div v-else>
            Пока нет ни одного пользователя
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import VObj from "./VObj";
    import VButton from "./VButton";
    import VSpinner from "./VSpinner";

    export default {
        name: "Users",
        components: {VButton, VObj, VSpinner},
        computed: mapState(['users', 'currentUser']),
        activated: function() {
            this.$store.dispatch('loadUsers');
            this.$store.dispatch('loadCurrentUser');
        }
    }
</script>

<style scoped>
    .users {
        width: 400px;
    }
</style>