<template>
    <div class="wrapper">
        <span v-if="label" class="label">{{ label }}</span>
        <input
            v-bind="$attrs"
            v-on:input="onInput($event)"
            :class="{valid: isValid}"
        >
    </div>
</template>

<script>
    export default {
        name: "VInput",
        inheritAttrs: false,
        data: function() {
            return {
                isValid: true,
            }
        },
        props: {
            label: {
                type: String,
                default: null
            },
            validator: {
                type: Function,
                default: () => true
            }
        },
        methods: {
            onInput(event) {
                const target = event.target;
                const value = target.type === 'file' ? target.files : target.value;

                this.isValid = this.validator(value);
                this.$emit('input', value);
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        margin: 10px;
    }

    input {
        height: 30px;
        width: 100%;
    }

    .label {
        font-weight: bold;
        font-size: .85em;
    }

    input:not(.valid) {
        border: #ca4334 1px solid;
    }
</style>
