<template>
  <div class="Header">
    <div class="Logo">
      <h4>Jared Sauve</h4>
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
    font-size: 38px;
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