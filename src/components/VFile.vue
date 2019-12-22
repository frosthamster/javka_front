<template>
    <div class="file">
        <div>Файл: {{data.name}}</div>
        <div>id: {{data.id}}</div>
        <div>Описание: {{data.description}}</div>
        <a :href="downloadLink" :download="data.name">Скачать</a>
    </div>
</template>

<script>
    import VObj from "./VObj";
    import {BASE_URL} from '../main.js';

    export default {
        name: "VFile",
        components: {VObj},
        props: {
            data: Object
        },
        computed: {
            downloadLink: function () {
                return `${BASE_URL}files/download?fileId=${this.data.id}&session=${this.$store.state.session}`
            }
        }
    }
</script>

<style scoped>
    .file {
        border: solid 1px #000;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px;
    }
</style>