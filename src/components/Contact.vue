<template>
  <div class="gutters">
    <jared-header></jared-header>
    <div class="contact-main">
      <h2 class="pad-btm">Contact</h2>
      <div class="contact-content" v-html="contactContent"></div>
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
import JaredHeader from "./JaredHeader.vue";
import { marked } from "marked";
import { onMounted, ref } from "vue";

interface LinksInt {
  LinkName: string;
  Link: string;
}

let contactContent = ref<string>();
let email = ref<string>();

let contactLinks = ref<LinksInt[]>([]);

onMounted(async () => {
  try {
    //use this if I need to get Images as well as content - '/api/blog-posts?populate=*'
    let response = await fetch(
      import.meta.env.VITE_STRAPI_URL + "/api/contact?populate=*",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let entireResponse = await response.json();
    contactContent.value = marked.parse(
      await entireResponse.data.attributes.ContactContent
    );
    //this.email = await entireResponse.data.attributes.Email
    let myLinks = await entireResponse.data.attributes.links.data;
    for (let links of myLinks) {
      if (links.attributes.LinkName === "Email") {
        email.value = links.attributes.Link;
      } else {
        contactLinks.value.push({
          LinkName: links.attributes.LinkName,
          Link: links.attributes.Link,
        });
      }
    }
    //debugger
  } catch (e) {
    console.log("Error");
  }
});
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
</style>
