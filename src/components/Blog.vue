<template>
  <div class="gutters">
      <jared-header></jared-header>
      <div class="blog-main">
        <h2>Blog</h2>
        <div class="cards">
          <div class="box" v-for="card in cards" :key="card.id">
            <div class="image-box">
              <router-link :to="{ path: '/blogpost', query: { BlogID: card.id } }">
                <img :src="card.attributes.SummaryImage.data.attributes.url" alt="aa"/>
              </router-link>
            </div>
            <p>{{ card.attributes.SummaryContent }}</p>
          </div>
        </div>
      </div>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JaredHeader from './JaredHeader.vue';
import qs from 'qs';
import Template from './Template.vue';

@Component({
  components: {
    JaredHeader,
    Template
  },
})
export default class Blog extends Vue {
  @Prop() private msg!: string;
  cards = [];


  async mounted(){
    try{
      const SummaryData = qs.stringify(
        {
          populate: 'SummaryImage',
          fields: ['SummaryContent']
        }, 
        {
          encodeValuesOnly: true,
        });
      let response = await fetch(`api/blog-posts?${SummaryData}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let blogSummary = await response.json();
      this.cards = await blogSummary.data;
    }
    catch(e){
      console.log("error")
    }
  }

  }
</script>

<style lang="scss">
    .gutters{
        margin: 0px 150px;
        .box{
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          flex: 1;
          .image-box{
            height: 300px;
            overflow: hidden;
            img{
              height: auto;
              width: 400px;
            }
          }
        }
    }

    .cards{
      display: grid;
      grid-template-columns: max-content max-content max-content;
      grid-template-rows: 1fr 1fr 1fr;
      column-gap: 150px;
      row-gap: 30px;
    }

</style>