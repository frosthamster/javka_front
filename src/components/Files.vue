<template>
    <div>
        Файлы
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import VObj from "./VObj";

    export default {
        name: "Files",
        components: {VObj},
        computed: mapState(['root']),
    }
</script>

<style scoped>
</style>