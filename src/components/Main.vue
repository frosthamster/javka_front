<template>
    <VComponentSwitcher :components-info="componentsInfo"/>
</template>

<script>
    import {mapState} from 'vuex';
    import VComponentSwitcher from "./VComponentSwitcher";
    import Users from "./Users";
    import Files from "./Files";
    import Groups from "./Groups";

    export default {
        name: "Main",
        components: {VComponentSwitcher},
        computed: {
            ...mapState(['session']),
            componentsInfo: function () {
                return [
                    {
                        text: 'Файлы',
                        component: Files
                    },
                    {
                        text: 'Пользователи',
                        component: Users
                    },
                    {
                        text: 'Группы',
                        component: Groups
                    },
                ]
            }
        }
    }
</script>

<style scoped>
</style>
