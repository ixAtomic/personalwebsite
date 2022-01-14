<template>
  <div class="gutters">
      <jared-header></jared-header>
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
export default class Blog extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="scss">
    .gutters{
        margin: 0px 150px;
    }
</style>