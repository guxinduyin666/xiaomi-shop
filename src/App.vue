<template>
  <div id="app">
    <HeaderComponent />
    <router-view/>
    <FootComponent />
  </div>
</template>
<script>
    import HeaderComponent from '@/components/Header.vue';
    import FootComponent from './components/Footer'
    export default {
        name:'App',
        components:{
            HeaderComponent,
            FootComponent
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

