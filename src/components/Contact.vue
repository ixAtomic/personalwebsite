<template>
  <div class="gutters">
      <jared-header></jared-header>
      <div class="contact-main">
        <h2>Contact</h2>
        <div class="contact-content" v-html="contactContent">
        </div>
        <div class="links">
          <a :href="'mailto:' + email">
            {{ email }}
          </a>
          <a :href="'//' + link.Link" target="_blank" v-for="link in contactLinks" :key="link.LinkName">
            {{ link.LinkName }}
          </a>
        </div>
      </div>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JaredHeader from './JaredHeader.vue';
import { marked } from 'marked';

interface LinksInt {
  LinkName: string;
  Link: string;
}

@Component({
  components: {
    JaredHeader
  },
})
export default class Contact extends Vue {
  @Prop() private msg!: string;
  contactContent = ""
  email = ""
  contactLinks: LinksInt[] = []

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
        if(links.attributes.LinkName === 'Email'){
          this.email = links.attributes.Link
        }
        else{
          this.contactLinks.push({LinkName: links.attributes.LinkName, Link: links.attributes.Link})
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
        .contact-content{
          margin-bottom: 30px;
        }
        .links{
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          a{
            width: fit-content;
            margin-bottom: 30px;
          }
        }
    }
</style>