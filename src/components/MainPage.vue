<template>
  <div v-if="landingImage" class="home-page">
    <hamburger></hamburger>
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
  <loader-vue v-else></loader-vue>
</template>

<script setup lang="ts">
import Hamburger from "./Hamburger.vue";
import LoaderVue from "./Loader.vue";
import { ref, onMounted } from "vue";

let landingImage = ref<string>();

onMounted(async () => {
  try {
    let response = await fetch(
      import.meta.env.VITE_STRAPI_URL + "/api/landing?populate=*",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let entireResponse = await response.json();
    landingImage.value = await entireResponse.data.attributes.LandingImage.data
      .attributes.url;
  } catch (e) {
    console.log("error");
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .middle-justify {
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
}

@media (min-width: 1025px) and (max-width: 1200px) {
  .home-page {
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
}

@media (min-width: 768px) and (max-width: 1024px) {
  .home-page {
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
}

@media (min-width: 320px) and (max-width: 767px) {
  .home-page {
    justify-content: flex-start;
    position: relative;
    overflow-x: hidden;
    .middle-justify {
      flex-direction: column;
      .link-content {
        height: 115px;
        width: initial;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        margin-bottom: 50px;
        .main-nav {
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
