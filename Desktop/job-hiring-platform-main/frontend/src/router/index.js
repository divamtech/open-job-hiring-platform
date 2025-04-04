// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AdminDashboard from "../components/AdminDashboard.vue";
import AdminLogin from "../components/AdminLogin.vue"; // Ensure correct path

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"), // Your Home page
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin, // Link to the login page
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard, // Dashboard after login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
