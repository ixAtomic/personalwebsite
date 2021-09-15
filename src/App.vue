<template>
  <div id="app">
    <jared-header></jared-header>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <main-page msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainPage from './components/MainPage.vue';
import JaredHeader from './components/JaredHeader.vue';


@Component({
  components: {
    MainPage,
    JaredHeader,
  },
})
export default class App extends Vue {}
</script>

<style>
@import './css/main.css';
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Caveat', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
