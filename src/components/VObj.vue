<template>
    <pre>{{ JSON.stringify(obj, null, 4)}}</pre>
</template>

<script>
    export default {
        name: "VObj",
        props: ['obj']
    }
</script>

<style scoped>
</style>
