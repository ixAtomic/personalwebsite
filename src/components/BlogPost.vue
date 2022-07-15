<template>
  <div class="gutters">
    <jared-header></jared-header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JaredHeader from './JaredHeader.vue';
import qs from 'qs';

@Component({
  components: {
    JaredHeader
  },
})

export default class BlogPost extends Vue{
    @Prop() private BlogID!: string
    Content = []

    async mounted() {
        const PostContent = qs.stringify(
        {
          populate: 'PostImages',
          fields: ['PostContent']
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
        this.Content = await blogContent.data
    }
}
</script>

<style lang="scss">
    .gutters{
        margin: 0px 150px;

    }
</style>