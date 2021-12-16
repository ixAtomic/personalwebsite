<template>
  <div class="header">
    <h1>Jared Sauve</h1>
    <div class="nav">
      <router-link to="/about">About Me</router-link>
      <a href="#">Blog</a>
      <a href="#">Contact</a>
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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 50px;
    padding-bottom: 25px;
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    .nav{
      margin-bottom: 27px;
      margin-right: 100px;
      display: flex;
      gap: 60px;
    }
  }
</style>