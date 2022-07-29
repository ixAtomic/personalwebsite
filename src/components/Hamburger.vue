<template>
  <div class="nav-menu">
    <div
      :class="{ display: childMenu }"
      class="menu"
      @click="updateMenu(childMenu)"
    >
      <font-awesome-icon :icon="['fas', 'bars']" />
    </div>
    <div
      :class="{ display: !childMenu }"
      class="menu"
      @click="updateMenu(childMenu)"
    >
      <font-awesome-icon :icon="['fas', 'minus-circle']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits(["UpdateIsMenu"]);

let childMenu = ref(true);

function updateMenu(childMenuUpdate: Boolean) {
  childMenu.value = !childMenuUpdate;
  emits("UpdateIsMenu", childMenu.value);
}
</script>

<style>
.menu {
  display: none;
}
@media (min-width: 320px) and (max-width: 767px) {
  .nav-menu {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .menu {
    cursor: pointer;
    font-size: 48px;
    margin-right: 35px;
    margin-top: 15px;
    margin-bottom: 10px;
    display: none;
  }
  .display {
    display: block;
  }
}
</style>
