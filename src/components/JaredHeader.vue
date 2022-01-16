<template>
  <div class="header">
    <h1 class="logo"><router-link to="/">Jared Sauve</router-link></h1>
    <div class="nav">
      <router-link to="/about">About Me</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss">
  .header{
    .logo a{
      text-decoration: none;
      font-size: 96px;
    }
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    //padding-top: 40px;
    padding-bottom: 25px;
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 100px;
    .nav{
      margin-bottom: 27px;
      margin-right: 100px;
      display: flex;
      gap: 60px;
    }
  }
</style>