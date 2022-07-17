<template>
  <div class="gutters">
      <jared-header></jared-header>
      <div>
        <h2>Blog</h2>
        <div class="cards">
          <div class="box" v-for="card in cards" :key="card.id">
            <router-link :to="{ path: '/blogpost', query: { BlogID: card.id } }">
              <div class="image-box">
                <img :src="card.attributes.SummaryImage.data.attributes.url" alt="aa"/>
              </div>
            </router-link>
            <div class="display">
              <p class="card-title">{{ card.attributes.SummaryTitle }}</p>
            </div>
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
          fields: [ 'SummaryTitle']
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
          justify-content: flex-end;
          flex-direction: column;
          align-items: center;
          flex: 1;
          position: relative;
          :hover + .display{
            visibility: visible;
            transition: visibility 0s, opacity 400ms linear;
            opacity: 1;
          }
          .image-box{
            height: 300px;
            overflow: hidden;
            img{
              transition: transform 5s ease;
              height: auto;
              width: 450px;
            }
            :hover{
              transform: scale(1.2);
            }
          }
          .display{
            position: absolute;
            visibility: hidden;
            background: rgba(0,0,0,.85);
            opacity: 0;
            color: white;
            z-index: 1;
            pointer-events: none;
            width: 100%;
            height: 115px;
            //height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            align-items: center;
            justify-content: center;
          }
        }
    }

    .cards{
      display: grid;
      grid-template-columns: max-content max-content max-content;
      grid-template-rows: 1fr 1fr 1fr;
      column-gap: 75px;
      row-gap: 75px;
    }

</style>