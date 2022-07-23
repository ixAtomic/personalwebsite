<template>
  <div class="gutters">
      <jared-header></jared-header>
      <div class="about-main">
        <div class="about-content">
          <div class="header-content">
            <h2>About Me</h2>
            <a :href="resume.url" :download="resume.name" class="wrapper">
              <font-awesome-icon class="resume" :icon="['far', 'file']"/>
              <p class="phase-in-text">Resume</p>
            </a>
          </div>
          <div class="content" v-html="About">
            <!-- content from API -->
          </div> 
        </div> 
        <div class="about-image">
          <img :src="aboutImageUrl"/>
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
export default class About extends Vue {
  @Prop() private msg!: string;
  About = "";
  AboutContent = "";
  aboutImageUrl = "";
  resume = [];

  async mounted() {
    try{
      //use this if I need to get Images as well as content - '/api/blog-posts?populate=*'
      let response = await fetch('/api/about-me?populate=*', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let entireResponse = await response.json();
      this.About = marked.parse(await entireResponse.data.attributes.AboutContent);
      this.aboutImageUrl = await entireResponse.data.attributes.AboutImage.data.attributes.url
      this.resume = await entireResponse.data.attributes.Resume.data.attributes
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
    .about-main{
      display: flex;
      gap: 20px;

      .about-content{
        flex: 1;
        height: 325px;
        .header-content{
          display: flex;
          align-items: center;
          position: relative;
          margin-bottom: 30px;
          h2{
            //margin-bottom: 50px;
            width: 100%;
          }
          .wrapper{
            display: flex;
            align-items: center;
            justify-content: center;

            .resume{
              position: absolute;
              transition-duration: 400ms;
              font-size: 64px;
            }
            p{
              visibility: hidden;
              opacity: 0;
              transition: visibility 100ms, opacity 1s ease-in;
            }
          }
          .wrapper:hover{
            cursor: pointer;
            .resume{
              transition-duration: 1s;
              transform: translateX(-80px);
            }
            p{
              opacity: 1;
              text-decoration: underline;
              visibility: visible;
            }
          }
        }
        .content{
          height: 285px;
          overflow: hidden;
        }
      }
      .about-image{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        img{
          height: auto;
          width: 465px;
        }
      }
    }
</style>