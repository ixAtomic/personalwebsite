<template>
  <div v-if="content" class="gutters">
    <jared-header></jared-header>
    <h2>
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
      <div v-if="index != Posts.length - 1" class="border-bottom" />
      <!-- not putting border on last element or only element if there is just one -->
    </div>
  </div>
</template>

<script setup lang="ts">
import JaredHeader from "./JaredHeader.vue";
import qs from "qs";
import { PostsInt, ContentInt } from "@/models/PersonalModels";
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
.gutters {
  margin: 0px 150px;
  padding-bottom: 100px;
  .post-data {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 50px;
    margin-bottom: 100px;
  }
  .post-image {
    overflow: hidden;
    img {
      height: auto;
      width: 600px;
    }
  }
  .post-content {
    flex: 1 1 50%;
  }
  .border-bottom {
    padding-bottom: 75px;
    border-bottom: 3px solid rgba(0, 0, 0, 0.2);
    width: 600px;
  }
  .class-order {
    order: -1;
  }
}
</style>
