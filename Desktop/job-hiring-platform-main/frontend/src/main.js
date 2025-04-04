import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./style.css";
// src/main.js

createApp(App) // Create the Vue app instance using the App component
  .use(router) // Use the router to handle page navigation
  .mount("#app"); // Mount the Vue app on the element with id="app"
