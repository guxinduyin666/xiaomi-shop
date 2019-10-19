<template>
  <div id="app">
    <HeaderComponent />
    <router-view/>
  </div>
</template>
<script>
    import HeaderComponent from '@/components/Header.vue';
    export default {
        name:'App',
        components:{
            HeaderComponent
        }
    }
</script>
<style>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 10px;
  }
</style>

