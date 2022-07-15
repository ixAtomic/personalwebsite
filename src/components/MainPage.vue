<template>
  <div class="home-page">
    <div class="middle-justify">
      <div class="link-content">
        <h2>Jared Sauve</h2>
        <p>Web Developer</p>
        <div class="main-nav">
          <router-link to="/about">About Me</router-link>
          <router-link to="/Blog">Blog</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
      </div>
      <div class="main-image">
        <img :src="landingImage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainPage extends Vue {
  @Prop() private msg!: string;
  landingImage = "";

  async mounted() {
    try{
      let response = await fetch('/api/landing?populate=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let entireResponse = await response.json();
      this.landingImage = await entireResponse.data.attributes.LandingImage.data.attributes.url
    }
    catch(e){
      console.log("error")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .home-page{
    display: flex;
    justify-content: flex-end;
    margin-right: 100px;
    align-items: center;
    height: 100%;

    .middle-justify{
      width: 1400px;
      height: 800px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      
      .link-content{
        height: 500px;
        width: 400px;
        align-self: center;
        .main-nav{
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          a{
            width: fit-content;
          }
        }
      }
      .main-image{
        border: solid 2px black;
        overflow: hidden;
        border-radius: 50%;
        height: 850px;
        width: 850px;
        img{
          object-position: 0px -200px;
          height: auto;
          width: 850px;
        }
      }
    }
  }

</style>
