<template>
  <div id="app">
    <suspense>
      <router-view></router-view>
    </suspense>
  </div>
</template>

<script lang="ts">
import { configureCompat } from "vue";

configureCompat({
  WATCH_ARRAY: false,
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import "./css/main.css";
</style>
