<template>
  <div id="app">
    <suspense>
      <router-view></router-view>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import { configureCompat, watch } from "vue";
import { RouterView } from "vue-router";

// const { result } = useQuery(gql`
//   query {
// 		stuff{
//       test,
//       testwysyeyg
//     }
//   }
// `);

// const query = gql`
//   query {
//     server_ping
//   },
// `;

// const { result } = useQuery(query, null, { clientId: 'System' })

// watch(result, value => {
//   console.log(value);
// })

configureCompat({
  WATCH_ARRAY: false,
  RENDER_FUNCTION: false
});

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import "./css/main.css";
</style>