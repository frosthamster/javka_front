<template>
    <div v-if="users">
        <div v-for="user in users">
            <br>
            <VObj :obj="user"/>
        </div>
    </div>
    <div v-else>
        <VButton :on-click="() => this.$store.dispatch('loadUsers')">Загрузить пользователей</VButton>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import VObj from "./VObj";
    import VButton from "./VButton";

    export default {
        name: "Users",
        components: {VButton, VObj},
        computed: mapState(['users']),
    }
</script>

<style scoped>
</style>