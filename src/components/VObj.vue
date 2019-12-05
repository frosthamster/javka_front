<template>
    <pre class="obj">{{ JSON.stringify(obj, null, 4)}}</pre>
</template>

<script>
    export default {
        name: "VObj",
        props: ['obj']
    }
</script>

<style scoped>
    .obj {
        padding: 10px;
        border: solid 1px #000;
    }
</style>
