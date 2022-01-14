<template>
  <div class="gutters">
      <jared-header></jared-header>
      <div>  </div>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JaredHeader from './JaredHeader.vue';

@Component({
  components: {
    JaredHeader
  },
})
export default class About extends Vue {
  @Prop() private msg!: string;
  blogposts = [];

  async mounted() {
    try{
      const response = await fetch('/api/blog-posts?populate=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(await response.json());
    }
    catch(e){
      console.log("Error")
    }
  }


  getString(): string{
    return "Hello world"
  }

}
</script>

<style lang="scss">
    .gutters{
        margin: 0px 150px;
    }
</style>