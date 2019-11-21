<template>
    <button v-bind="$attrs" @click="onClick" :disabled="!enabled">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "VButton",
        inheritAttrs: false,
        props: {
            onClick: {
                type: Function,
                required: true
            },
            enabled: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 8px;
        padding: 8px 8px;

        border: none;
        background-color: inherit;
        color: #000;

        font-size: 1.2em;
        font-weight: bold;

    }

    button:enabled {
        cursor: pointer;
        color: #1d77b6;
    }

    button:enabled:hover {
        background: #e4e4e4;
    }
</style>
