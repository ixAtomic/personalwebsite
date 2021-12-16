<template>
  <div id="app">
    <router-view></router-view>
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
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import './css/main.css';
</style>
