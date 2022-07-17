<template>
  <div class="gutters">
    <jared-header></jared-header>
    <h2>{{ content.SummaryTitle }}</h2>
    <div class="post-data" v-for="post in Posts" :key="post.id">
      <div class="post-image">
        <img :src="post.BlogContent.attributes.BlogImage.data.attributes.url" alt="aa"/>
      </div>
      <div :class="{ 'class-order': post.ImagePosition }" class="post-content" v-html="post.BlogContentHTML">

      </div>
      <div class="border-bottom"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JaredHeader from './JaredHeader.vue';
import qs from 'qs';
import Template from './Template.vue';
import { marked } from 'marked';

interface PostsInt {
  BlogContent: [];
  BlogContentHTML: string;
  ImagePosition: boolean;
}

@Component({
  components: {
    JaredHeader,
    Template
  },
})

export default class BlogPost extends Vue{
    @Prop() private BlogID!: string
    content = [ ]
    Posts: PostsInt[] = []

    async mounted() {
        const PostContent = qs.stringify(
        {
          populate: ['blog_post_contents', 'blog_post_contents.BlogImage'],
          fields: [ 'SummaryTitle']
        }, 
        {
          encodeValuesOnly: true,
        });
        let response = await fetch(`api/blog-posts/${this.BlogID}?${PostContent}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        let blogContent = await response.json();
        this.content = await blogContent.data.attributes
        let BlogContents = await blogContent.data.attributes.blog_post_contents.data
        for(let BlogContent of BlogContents){
          let BlogContentHTML = marked.parse(BlogContent.attributes.BlogContent);
          this.Posts.push({BlogContent: BlogContent, BlogContentHTML: BlogContentHTML, ImagePosition: BlogContent.attributes.ImagePosition})
        }
    }
}
</script>

<style lang="scss">
    .gutters{
      margin: 0px 150px;
      .post-data{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 50px;
        margin-bottom: 75px;
      }
      .post-image{
        overflow: hidden;
        img{
          height: auto;
          width: 600px;
        }
      }
      .post-content{
        flex: 1 1 50%;
      }
      .border-bottom{
        padding-bottom: 50px;
        border-bottom: 3px solid rgba(0, 0, 0, 0.2);
        width: 200px;
      }
      .class-order{
        order: -1;
      }
    }
</style>