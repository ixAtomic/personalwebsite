<template>
  <div class="gutters">
      <jared-header></jared-header>
      <div class="contact-main">
        <h2>Contact</h2>
        <div class="contact-content" v-html="contactContent">
        </div>
        <div v-if="getLinks()" class="links">
          {{ getLinks() }}
        </div>
      </div>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JaredHeader from './JaredHeader.vue';
import { marked } from 'marked';

@Component({
  components: {
    JaredHeader
  },
})
export default class Contact extends Vue {
  @Prop() private msg!: string;
  data = []
  contactContent = ""
  contactLinks = []
  email = ""

  async mounted(){
       try{
      //use this if I need to get Images as well as content - '/api/blog-posts?populate=*'
      let response = await fetch('/api/contact?populate=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let entireResponse = await response.json();
      this.contactContent = marked.parse(await entireResponse.data.attributes.ContactContent);
      this.email = await entireResponse.data.attributes.Email
      this.data = await entireResponse.data
      //debugger
    }
    catch(e){
      console.log("Error")
    }
  }

  async getLinks(){
    return await this.data.filter(link => link === "FacebookLink")
  }

}
</script>

<style lang="scss">
    .gutters{
        margin: 0px 150px;
        h2{
          margin-bottom: 30px;
        }
    }
</style>