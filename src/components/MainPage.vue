<template>
  <div class="home-page">
    <div class="middle-justify">
      <div class="link-content">
        <h2>Jared Sauve</h2>
      </div>
      <div class="main-image">
        <img src="../../photos/IMG_4161.jpg" />
      </div>
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
<style lang="scss" scoped>
  .home-page{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .middle-justify{
      width: 1000px;
      height: 600px;
      display: flex;
      // flex: 1 0 auto;
      
      .link-content{
        background-color: blue;
        height: 400px;
        align-self: center;
      }
      .main-image{
        border-radius: 50%;
        // background-image: url("../../photos/IMG_4161.jpg");
        height: 600px;
        width: 600px;
      }
    }
  }

</style>
