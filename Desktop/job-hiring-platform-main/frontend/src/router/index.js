import ManageCandidates from "@/components/ManageCandidates.vue";
import { createRouter, createWebHistory } from "vue-router";
import Apply from "../components/Apply.vue";
import JobList from "../components/JobList.vue";
const Home = () => import("../components/Home.vue");
const AdminLogin = () => import("../components/AdminLogin.vue");
const AdminDashboard = () => import("../components/AdminDashboard.vue");
const ManageJobs = () => import("../components/ManageJobs.vue");

const routes = [
  { path: "/joblist", component: JobList },
  { path: "/apply/:id", component: Apply },

  {
    path: "/admin/candidate/:id",
    name: "CandidateDetail",
    component: () => import("@/components/CandidateDetail.vue"),
    props: true,
  },

  { path: "/", name: "Home", component: Home },
  { path: "/admin/login", name: "AdminLogin", component: AdminLogin },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  { path: "/admin/manage-jobs", name: "ManageJobs", component: ManageJobs },
  { path: "/:catchAll(.*)", redirect: "/" },
  { path: "/admin/manage-candidates", component: ManageCandidates },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
