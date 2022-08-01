<template>
  <div class="header">
    <h1 class="logo"><router-link to="/">Jared Sauve</router-link></h1>
    <div class="nav">
      <router-link to="/about">About Me</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </div>
  <hamburger></hamburger>
</template>

<script setup lang="ts">
import Hamburger from "./Hamburger.vue";
</script>

<style lang="scss">
.header {
  .logo a {
    text-decoration: none;
    font-size: 96px;
  }
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
  padding-bottom: 25px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 100px;
  flex-wrap: wrap;
  .nav {
    margin-bottom: 27px;
    margin-right: 100px;
    display: flex;
    gap: 60px;
  }
}

@media (max-width: 1200px) {
  .header {
    margin-bottom: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .nav {
      margin-right: 0px;
    }
  }
}

@media (max-width: 767px) {
  .header {
    display: none;
  }
}
</style>
