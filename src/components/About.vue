<template>
  <div v-if="aboutImageUrl" class="gutters">
    <jared-header></jared-header>
    <div class="about-main">
      <div class="about-content">
        <div class="header-content">
          <h2>About Me</h2>
          <a
            :href="state.resume.url"
            :download="state.resume.name"
            target="_blank"
            class="wrapper"
          >
            <font-awesome-icon class="resume" :icon="['far', 'file']" />
            <p class="lgP">Resume</p>
            <p class="smP">Resume</p></a
          >
        </div>
        <div class="content" v-html="state.about"></div>
      </div>
      <div class="about-image">
        <img :src="aboutImageUrl" />
      </div>
    </div>
  </div>
  <loader-vue v-else></loader-vue>
</template>

<script lang="ts" setup>
import JaredHeader from "./JaredHeader.vue";
import LoaderVue from "./Loader.vue";
import { marked } from "marked";
import { onMounted, reactive, ref } from "vue";

const state = reactive({
  resume: { url: "", name: "" },
  about: "",
});

let aboutImageUrl = ref<string>();

onMounted(async () => {
  try {
    //use this if I need to get Images as well as content - '/api/blog-posts?populate=*'
    const response = await fetch(
      import.meta.env.VITE_STRAPI_URL + "/api/about-me?populate=*",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let entireResponse = await response.json();
    state.about = marked.parse(
      await entireResponse.data.attributes.AboutContent
    );
    aboutImageUrl.value = await entireResponse.data.attributes.AboutImage.data
      .attributes.url;
    getResumeURL(
      await entireResponse.data.attributes.Resume.data.attributes.url
    );
    state.resume.name = await entireResponse.data.attributes.Resume.data
      .attributes.name;
  } catch (e) {
    console.log("Error getting post");
  }
});

async function getResumeURL(url: string) {
  state.resume.url = url;
}
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
    flex-direction: column;
    justify-content: center;
    height: fit-content;
    .header-content {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 30px;
      h2 {
        //margin-bottom: 50px;
        width: 100%;
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
    }
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
  }
  .about-main .about-content .header-content {
    .resume {
      transition-duration: unset !important;
      position: unset !important;
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
  }

  @media (max-width: 767px) {
    .about-main {
      margin: 0px 50px;
    }
  }
}
</style>
