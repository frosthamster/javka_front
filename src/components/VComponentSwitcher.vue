<template>
    <div class="switcher">
        <div class="switcher-buttons">
            <button
                class="bt-select"
                v-for="cInfo in componentsInfo"
                :key="cInfo.text"
                :class="{selected: isSelected(cInfo.component)}"
                :style="buttonStyle"
                @click="select(cInfo.component)"
            >{{ cInfo.text }}
            </button>
        </div>
        <keep-alive>
            <component :is="currentComponent"/>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'VComponentSwitcher',
        props: {
            componentsInfo: Array,
            buttonStyle: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data: function () {
            return {
                currentComponent: this.componentsInfo[0].component
            }
        },
        methods: {
            select(component) {
                this.currentComponent = component;
            },

            isSelected(component) {
                return this.currentComponent === component;
            }
        }
    }
</script>

<style scoped>
    .switcher {
        margin: 16px 0;
    }

    .switcher-buttons {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 16px;
        margin-left: -16px;
    }

    .bt-select {
        margin-right: 8px;
        margin-left: 8px;
        padding: 8px 8px;

        border: none;
        background-color: inherit;
        color: #1d77b6;

        font-size: 1.2em;
        font-weight: bold;
    }

    .bt-select {
        cursor: default;
    }

    .bt-select:not(.selected) {
        cursor: pointer;
    }

    .bt-select:not(.selected):hover {
        background: #e4e4e4;
    }

    .selected {
        color: #000;
    }
</style>
