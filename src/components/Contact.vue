<template>
  <div class="gutters">
      <jared-header></jared-header>
      <div class="contact-main">
        <h2>Contact</h2>
        <div class="contact-content" v-html="contactContent">
        </div>
        <div>
          {{ email }}
        </div>
        <div v-for="link in contactLinks" :key="link" class="links">
          {{ link }}
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
  contactContent = ""
  contactLinks: Array<string>=[];
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
      //this.email = await entireResponse.data.attributes.Email
      let myLinks = await entireResponse.data.attributes.links.data
      for(let links of myLinks){
        if(links.attributes.Link.includes('@')){
          this.email = await links.attributes.Link
        }
        else{
          this.contactLinks.push(links.attributes.Link)
        }
      }
      //debugger
    }
    catch(e){
      console.log("Error")
    }
  }

  // async getLinks(){
      
  // }



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