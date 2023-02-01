<template>
  <loader-vue v-if="loading"></loader-vue>
  <div v-else-if="result" class="gutters">
    <jared-header></jared-header>
    <div class="about-main">
      <div class="about-content">
        <h2>About Me</h2>
        <a
          :href="getAssetURL(result.About.Resume.id)"
          :download="'Jared Resume'"
          target="_blank"
          class="wrapper"
        >
          <font-awesome-icon class="resume" :icon="['far', 'file']" />
          <p class="lgP">Resume</p>
          <p class="smP">Resume</p></a
        >
        <div class="content" v-html="result.About.AboutContent"></div>
      </div>
      <div class="about-image">
        <img :src="getAssetURL(result.About.AboutImage.id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import JaredHeader from "@/components/JaredHeader.vue";
import LoaderVue from "@/components/Loader.vue";
import about from '@/assets/content/about.json';
import { onMounted, reactive, ref } from "vue";
import { useQuery } from '@vue/apollo-composable';
import { GET_ABOUT_PAGE } from '@/graphql'
import { getAssetURL } from "@/helper";

const { result, loading } = useQuery(GET_ABOUT_PAGE);

console.log(result);
</script>

<style lang="scss">
.about-main {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
  padding-top: 25px;
  padding-bottom: 100px;
  .about-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    flex-wrap: wrap;
    gap: 35px;
  }
  .about-image {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    img {
      height: auto;
      width: 600px;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .resume {
      position: absolute;
      transition-duration: 400ms;
      font-size: 64px;
    }
    p {
      visibility: hidden;
      opacity: 0;
      transition: visibility 100ms, opacity 1s ease-in;
    }
    .smP {
      display: none;
      text-decoration: underline;
    }
  }
  .wrapper:hover {
    cursor: pointer;
    .resume {
      transition-duration: 1s;
      transform: translateX(-80px);
    }
    p {
      opacity: 1;
      text-decoration: underline;
      visibility: visible;
    }
  }
  .content {
    width: 100%;
  }
}

@media (max-width: 1200px) {
  .about-main {
    flex-direction: column-reverse;
  }
  .about-image {
    padding-bottom: 50px;
  }

  .about-content {
    justify-content: space-evenly;
    margin-bottom: 100px;
  }
}

@media (max-width: 990px) {
  .wrapper {
    flex-wrap: wrap;
    flex-direction: column;
  }
  .resume {
    transition-duration: unset !important;
    position: unset !important;
    width: 100%;
  }
  p {
    visibility: visible !important;
    opacity: 1 !important;
    transition: none !important;
  }
  .lgP {
    display: none;
  }
  .smP {
    display: block !important;
  }
  .wrapper:hover {
    .resume {
      transition-duration: unset !important;
      transform: translateX(0px) !important;
    }
  }

  @media (max-width: 767px) {
    .wrapper {
      order: 5;
      width: 100%;
    }
    .about-main {
      margin: 0px 50px;
    }
  }
}
</style>
