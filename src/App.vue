<template>
    <div id="app">
        <Login/>
    </div>
</template>

<script>
    import Login from './components/Login.vue'

    export default {
        name: 'app',
        components: {
            Login: Login
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 95vh;
    }
</style>
