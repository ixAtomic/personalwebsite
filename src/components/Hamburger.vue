<template>
  <div>
    <div v-if="childMenu" class="menu" @click="updateMenu(childMenu)">
      <font-awesome-icon :icon="['fas', 'bars']"/>
    </div>
    <!-- <div class="links" @click="UpdateHamburger(msg)">
      <font-awesome-icon :icon="['fas', 'minus-circle']"/>
    </div> -->
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
    debugger
    this.childMenu = !isMenu
    return !isMenu;
  }
}
</script>

<style>
    @media (min-width: 320px) and (max-width: 767px) {
      .menu{
        position: absolute;
        cursor: pointer;
        top: 6%;
        right: 8%;
        font-size: 48px;
      }
      .links{
        position: absolute;
        cursor: pointer;
        top: 6%;
        right: 8%;
        font-size: 48px;
      }
      .display{
        display: none;
      }
    }
</style>