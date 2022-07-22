<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import search from './components/search.vue'
import haeder from './components/header.vue'
import index from './components/index.vue'
export default {
  name: 'App',
  components:{
    search,
    haeder,
    index
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
