<template>
  <div class="home-page">
    <hamburger @UpdateIsMenu="UpdateIsMenu($event)"></hamburger>
    <div v-if="isMenu" class="middle-justify">
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Hamburger from "./Hamburger.vue";

@Component({
  components: {
    Hamburger
  },
})
export default class MainPage extends Vue {
  @Prop() private msg!: string;
  landingImage = "";
  isMenu = true

  async mounted() {
    try {
      let response = await fetch("/api/landing?populate=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let entireResponse = await response.json();
      this.landingImage = await entireResponse.data.attributes.LandingImage.data
        .attributes.url;
    } catch (e) {
      console.log("error");
    }
  }

  UpdateIsMenu(isMenu: boolean){
    debugger
    this.isMenu = isMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-page {
  display: flex;
  justify-content: center;
  //margin: 0 10%;
  align-items: center;
  height: 100%;
  .menu{
    display: none;
    position: absolute;
    cursor: pointer;
    top: 6%;
    right: 8%;
    font-size: 48px;
  }
  .middle-justify {
    // width: 1400px;
    // height: 800px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    .link-content {
      height: 500px;
      width: 350px;
      align-self: center;
      .main-nav {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        a {
          width: fit-content;
        }
      }
    }
    .main-image {
      border: solid 2px black;
      overflow: hidden;
      border-radius: 50%;
      height: 710px;
      width: 710px;
      img {
        height: auto;
        width: 750px;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    .home-page {
      margin-right: 0px;
    }
    .middle-justify {
      .link-content {
        width: 250px;
      }
      .main-image {
        height: 600px;
        width: 600px;
        img {
          width: 640px;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .home-page {
      margin-right: 0px;
    }
    .middle-justify {
      .link-content {
        width: 250px;
        height: 300px;
      }
      .main-image {
        height: 400px;
        width: 400px;
        img {
          width: 440px;
        }
      }
    }
  }

    @media (min-width: 320px) and (max-width: 767px) {
    .home-page {
      margin-right: 0px;
      align-items: center;
    }
    .menu{
      display: block;
    }
    .middle-justify {
      flex-direction: column;
      .link-content {
        height: 115px;
        width: initial;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        margin-bottom: 50px;
        .main-nav{
          display: none;
        }
      }
      .main-image {
        height: 350px;
        width: 350px;
        img {
          width: 440px;
        }
      }
    }
  }
}
</style>
