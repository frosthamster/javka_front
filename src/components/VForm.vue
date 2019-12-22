<template>
    <div class="form">
        <h5 class="title">
            {{ title }}
        </h5>
        <VInput
            v-for="field of fields"
            :key="field.name"
            :placeholder="field.placeholder"
            :label="field.label"
            :type="field.type ? field.type : 'text'"
            :validator="field.validator"
            @input="$data[field.name] = $event"
        />
        <VButton :onClick="callHandler" :enabled="allFieldsValid">
            {{ handlerTitle }}
        </VButton>
    </div>
</template>

<script>
    import VInput from './VInput';
    import VButton from './VButton'

    export default {
        name: 'VForm',
        props: {
            title: String,
            handlerTitle: String,
            handler: Function,
            fields: Array
        },
        data: function () {
            const result = {};

            for (let field of this.fields)
                result[field.name] = field.default ? field.default : '';

            return result;
        },
        components: {
            VButton,
            VInput
        },
        computed: {
            allFieldsValid() {
                for (let field of this.fields)
                    if (!field.validator(this[field.name]))
                        return false;
                return true;
            }
        },
        methods: {
            callHandler() {
                const data = {};

                for (let field of this.fields){
                    data[field.name] = field.parser
                        ? field.parser(this[field.name])
                        : this[field.name];
                }

                this.handler(data);
            }
        }
    }
</script>

<style scoped>
    .title {
        margin: 10px;
    }

    .form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
    }
</style>
