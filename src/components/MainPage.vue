<template>
  <div class="home-page">
    <div class="middle-justify">
      <h2>Jared Sauve</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home-page{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
