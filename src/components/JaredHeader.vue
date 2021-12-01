<template>
  <div class="Header">
    <div class="Logo">
      <p>Jared Sauve</p>
    </div>
    <div class="Nav">
      <p>nav</p>
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

<style>
  .Header{
    display: flex;
  }
  .Logo{
    font-size: 96px;
    font-weight: 100;
    width: 85%;
    background: red;
    padding: 10px;
    padding-left: 20px;
  }
  .Nav{
    background: blue;
    padding: 20px;
    width: 15%;
  }
</style>