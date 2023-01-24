<template>
  <div v-if="cards" class="gutters">
    <jared-header></jared-header>
    <div class="blog-gutter">
      <div class="blog-main">
        <h2>Blog</h2>
        <div class="cards">
          <div class="box" v-for="card in cards" :key="card.id">
            <router-link
              :to="{ path: '/blogpost', query: { BlogID: card.id } }"
            >
              <div class="image-box">
                <img
                  :src="card.attributes.SummaryImage.data.attributes.url"
                  alt="aa"
                />
                <div class="display">
                  <p class="card-title">{{ card.attributes.SummaryTitle }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <loader-vue v-else></loader-vue>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import JaredHeader from "./JaredHeader.vue";
import LoaderVue from "./Loader.vue";
import qs from "qs";

let cards = ref(null) as any;

const SummaryData = qs.stringify(
  {
    populate: "SummaryImage",
    fields: ["SummaryTitle"],
  },
  {
    encodeValuesOnly: true,
  }
);

// onMounted(async () => {
//   try {
//     const SummaryData = qs.stringify(
//       {
//         populate: "SummaryImage",
//         fields: ["SummaryTitle"],
//       },
//       {
//         encodeValuesOnly: true,
//       }
//     );
//     let response = await fetch(
//       `${import.meta.env.VITE_STRAPI_URL}/api/blog-posts?${SummaryData}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     let blogSummary = await response.json();
//     cards.value = blogSummary.data;
//   } catch (e) {
//     console.log("error");
//   }
// });
</script>

<style lang="scss">
.box {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  position: relative;
  :hover + .display {
    visibility: visible;
    transition: visibility 0s, opacity 400ms linear;
    opacity: 1;
  }
  .image-box {
    //height: auto;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: flex-end;
    img {
      transition: transform 5s ease;
      width: 450px;
      //height: auto;
      //flex-basis: 450px;
      //flex-shrink: 0;
    }
    :hover {
      transform: scale(1.2);
    }
  }
  .display {
    position: absolute;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    z-index: 1;
    pointer-events: none;
    width: 100%;
    //height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  column-gap: 75px;
  row-gap: 75px;
  margin-top: 35px;
}

@media (min-width: 1200px) {
  .display {
    visibility: hidden;
    opacity: 0;
    height: 115px;
  }
}

@media (max-width: 1200px) {
  .blog-main {
    padding-bottom: 50px;
  }
  .cards {
    grid-template-columns: 1fr 1fr;
  }
  .display {
    height: 80px;
  }
}

@media (max-width: 768px) {
  .blog-gutter {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blog-main {
    width: fit-content;
  }
  .cards {
    grid-template-columns: 1fr;
    row-gap: 75px;
    margin-top: 35px;
  }
  .box {
    .image-box img {
      width: 350px;
    }
    .display {
      visibility: visible;
    }
  }

  .blog-gutter {
    margin: 0px 50px;
    margin-bottom: 50px;
  }
  // .image-box {
  //   width: 300px;
  // }
}
</style>
