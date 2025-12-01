import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./tailwind.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import LucideIcon from "./components/LucideIcon.vue";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// Register LucideIcon globally
app.component("lucide-icon", LucideIcon);

app.use(router).use(vuetify).mount("#app");
