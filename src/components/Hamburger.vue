<template>
  <div>
    <div :class="{ 'display': childMenu }" class="menu" @click="updateMenu(childMenu)">
      <font-awesome-icon :icon="['fas', 'bars']"/>
    </div>
    <div :class="{ 'display': !childMenu }" class="menu" @click="updateMenu(childMenu)">
      <font-awesome-icon :icon="['fas', 'minus-circle']"/>
    </div>
  </div>
</template>

<script lang="ts">
import { VModel, Vue, Component, Emit } from "vue-property-decorator";
import { component } from "vue/types/umd";

@Component
export default class Hamburger extends Vue{
  childMenu = true

  @Emit("UpdateIsMenu")
  updateMenu(isMenu: boolean){
    this.childMenu = !isMenu
    return !isMenu;
  }
}
</script>

<style>
    .menu{
      display: none;
    }
    @media (min-width: 320px) and (max-width: 767px) {
      .menu{
        cursor: pointer;
        font-size: 48px;
        display: none;
      }
      .display{
        display: block;
      }
    }
</style>