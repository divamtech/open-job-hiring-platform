import { createRouter, createWebHistory } from "vue-router";

import Apply from "@/components/Apply.vue";
import ManageCandidates from "@/components/ManageCandidates.vue";
import ManageQuestions from "@/components/ManageQuestions.vue";
import UserExamPortal from "@/components/UserExamPortal.vue";
import UserStartExam from "@/components/UserStartExam.vue";
import JobList from "@/views/JobList.vue";

// Lazy-loaded components
const Home = () => import("@/components/Home.vue");
const AdminLogin = () => import("@/components/AdminLogin.vue");
const AdminDashboard = () => import("@/components/AdminDashboard.vue");
const ManageJobs = () => import("@/components/ManageJobs.vue");
const CandidateDetail = () => import("@/components/CandidateDetail.vue");
const UserLogin = () => import("@/views/UserLogin.vue");
const ExamManager = () => import("@/views/ExamManager.vue");
const UserDashboard = () => import("@/views/UserDashboard.vue");

const routes = [
  // Public Routes
  { path: "/", name: "Home", component: Home },

  // User Auth
  { path: "/user/login", name: "UserLogin", component: UserLogin },

  // User Dashboard and Exam Portal
  {
    path: "/dashboard",
    name: "Dashboard",
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/exams",
    name: "UserExams",
    component: UserExamPortal,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/exam/:examId",
    name: "UserStartExam",
    component: UserStartExam,
    meta: { requiresAuth: true },
  },
  {
    path: "/joblist",
    component: JobList,
    meta: { requiresAuth: true },
  },
  {
    path: "/apply/:id",
    component: Apply,
    meta: { requiresAuth: true },
  },

  // Admin Auth & Routes
  { path: "/admin/login", name: "AdminLogin", component: AdminLogin },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
  {
    path: "/admin/manage-jobs",
    name: "ManageJobs",
    component: ManageJobs,
  },
  {
    path: "/admin/manage-candidates",
    name: "ManageCandidates",
    component: ManageCandidates,
  },
  {
    path: "/admin/manage-exams",
    name: "ManageExams",
    component: ExamManager,
  },
  {
    path: "/admin/manage-questions",
    name: "ManageQuestions",
    component: ManageQuestions,
  },
  {
    path: "/admin/candidate/:id",
    name: "CandidateDetail",
    component: CandidateDetail,
    props: true,
  },

  // Catch All
  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Route Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/user/login");
  } else {
    next();
  }
});

export default router;
