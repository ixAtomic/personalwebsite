<template>
  <loader-vue v-if="loading"></loader-vue>
  <div v-else-if="result" class="gutters">
    <jared-header></jared-header>
    <div class="contact-main">
      <h2 class="pad-btm">Contact</h2>
      <div class="contact-content" v-html="result.Contact.ContactContent"></div>
      <div class="links">
        <a :href="'mailto:' + email">
          {{ email }}
        </a>
        <a
          :href="'//' + link.Link"
          target="_blank"
          v-for="link in contactLinks"
          :key="link.LinkName"
        >
          {{ link.LinkName }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import JaredHeader from "@/components/JaredHeader.vue";
import LoaderVue from "@/components/Loader.vue";
import { GET_CONTACT_PAGE } from "@/graphql";
import { useQuery } from "@vue/apollo-composable";
import { onMounted, ref, watch } from "vue";

interface LinksInt {
  LinkName: string;
  Link: string;
}

const email = ref<string>();
const contactLinks = ref<LinksInt[]>([]);

const { result, loading } = useQuery(GET_CONTACT_PAGE);

watch(result, value => {
  for (let links of value.Contact.ContactLinks) {
    if (links.LinkName === "Email") {
      email.value = links.Link;
    } else {
      contactLinks.value.push({
        LinkName: links.LinkName,
        Link: links.Link,
      });
    }
  }
})

</script>

<style lang="scss">
.pad-btm {
  padding-bottom: 25px;
}
h2 {
  margin-bottom: 30px;
}
.contact-content {
  margin-bottom: 30px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  a {
    width: fit-content;
    margin-bottom: 30px;
  }
}

@media (max-width: 767px) {
  .contact-main {
    margin: 0px 50px;
  }
}
</style>
