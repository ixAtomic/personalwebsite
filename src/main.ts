import {createApp, provide, h} from 'vue';
import App from './App.vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { router } from "./router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './css/main.css';
import { ApolloClients } from '@vue/apollo-composable'

const graphqlHttp = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_DIRECTUS_ASSETS_URL + 'graphql',
    
});

const graphqlSystemHttp = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_DIRECTUS_ASSETS_URL + 'graphql/system',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: graphqlHttp,
    cache,
});

const apolloClientSystem = new ApolloClient({
    link: graphqlSystemHttp,
    cache,
});

library.add(faFile);
library.add(faBars);
library.add(faMinusCircle);

const app = createApp({
    setup () {
        provide(ApolloClients, { default: apolloClient, System: apolloClientSystem })
    },

    render: () => h(App),
});
  

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
