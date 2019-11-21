<template>
    <div>
        <VForm
                title="Создать новую группу"
                handler-title="создать"
                :handler="(data) => this.$store.dispatch('createGroup', data)"
                :fields="[
            {
                name: 'name',
                validator: (e) => e.length > 5,
                placeholder: '(больше 5 симолов)',
                label: 'Имя группы',
            },
            {
                name: 'userIds',
                validator: (e) => /^(\d+,)*\d+$/.test(e),
                placeholder: '33,45,22,77',
                label: 'Пользователи',
                parser: (e) => e.split(',').map((i) => Number.parseInt(i))
            },
        ]"
        />
        <div v-if="groups">
            <div v-for="group in groups">
                <br>
                <VObj :obj="group"/>
            </div>
        </div>
        <div v-else>
            <VButton :on-click="() => this.$store.dispatch('loadGroups')">Загрузить группы</VButton>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import VObj from "./VObj";
    import VForm from "./VForm";
    import VButton from "./VButton";

    export default {
        name: "Groups",
        components: {VObj, VForm, VButton},
        computed: mapState(['groups']),
    }
</script>

<style scoped>
</style>