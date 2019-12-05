<template>
    <div class="groups">
        <hr>
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
        <hr>
        <VSpinner v-if="!groups"/>
        <div v-else-if="groups.length">
            <div>Все группы:</div>
            <div v-for="group in groups">
                <br>
                <VObj :obj="group"/>
            </div>
        </div>
        <div v-else>
            Пока нет ни одной группы
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import VObj from "./VObj";
    import VForm from "./VForm";
    import VButton from "./VButton";
    import VSpinner from "./VSpinner";

    export default {
        name: "Groups",
        components: {VObj, VForm, VButton, VSpinner},
        computed: mapState(['groups']),
        activated: function() {
            this.$store.dispatch('loadGroups')
        }
    }
</script>

<style scoped>
    .groups {
        width: 400px;
    }
</style>