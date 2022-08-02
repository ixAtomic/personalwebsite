<template>
  <div v-if="content" id="blog-padding" class="gutters">
    <jared-header></jared-header>
    <div class="post-main">
      <h2 class="pad-btm">
        {{ content.SummaryTitle }}
      </h2>
      <div class="post-data" v-for="(post, index) in Posts" :key="post.id">
        <div class="post-image">
          <img
            :src="post.BlogContent.attributes.BlogImage.data.attributes.url"
            alt="aa"
          />
        </div>
        <div
          :class="{ 'class-order': post.ImagePosition }"
          class="post-content"
          v-html="post.BlogContentHTML"
        ></div>
        <div v-if="index != Posts.length - 1" class="border-bottom">
          <div class="border-line"></div>
        </div>
        <!-- not putting border on last element or only element if there is just one -->
      </div>
    </div>
  </div>
  <loader-vue v-else></loader-vue>
</template>

<script setup lang="ts">
import JaredHeader from "./JaredHeader.vue";
import qs from "qs";
import { PostsInt, ContentInt } from "@/models/PersonalModels";
import LoaderVue from "./Loader.vue";
import { marked } from "marked";
import { onMounted, ref, Suspense } from "vue";

const props = defineProps({ BlogID: String });

let content = ref(null) as any;
let blogContent = ref(null) as any;
let Posts = ref<PostsInt[]>([]);

onMounted(async () => {
  const PostContent = qs.stringify(
    {
      populate: ["blog_post_contents", "blog_post_contents.BlogImage"],
      fields: ["SummaryTitle"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  let response = await fetch(
    `${import.meta.env.VITE_STRAPI_URL}/api/blog-posts/${
      props.BlogID
    }?${PostContent}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  blogContent.value = await response.json();
  content.value = await blogContent.value.data.attributes;
  let BlogContents = await blogContent.value.data.attributes.blog_post_contents
    .data;
  for (let BlogContent of BlogContents) {
    let BlogContentHTML = marked.parse(BlogContent.attributes.BlogContent);
    Posts.value.push({
      id: BlogContent.id,
      BlogContent: BlogContent,
      BlogContentHTML: BlogContentHTML,
      ImagePosition: BlogContent.attributes.ImagePosition,
    });
  }
});
</script>

<style lang="scss">
.post-main {
  justify-content: center;
  align-items: center;
}
#blog-padding {
  padding-bottom: 100px;
}
.pad-btm {
  padding-bottom: 25px;
}
.post-data {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max(400px, 38vw), 1fr));
  grid-template-rows: auto auto auto;
  grid-gap: 24px 40px;
  align-items: center;
}
.post-image {
  overflow: hidden;
  margin: 10px 0px;
  display: flex;
}
.post-content {
  flex: 1 1 50%;
}
.border-bottom {
  padding: 75px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  grid-column: 1/-1;
}
.border-line {
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  width: 600px;
}
.class-order {
  order: -1;
}

@media (max-width: 1200px) {
  .post-data {
    grid-template-columns: 1fr;
  }
  .class-order {
    order: 0;
  }
}

@media (max-width: 767px) {
  .post-data {
    display: flex;
    grid-template-columns: unset;
    grid-template-rows: unset;
    grid-gap: unset;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .pad-btm {
    font-style: normal;
    font-weight: bolder;
    font-size: 36px;
  }

  .post-image {
    img {
      width: 320px;
    }
    margin-bottom: 35px;
  }
  .post-main {
    margin: 0px 50px;
  }
  .border-bottom {
    width: 100%;
  }
}
</style>
