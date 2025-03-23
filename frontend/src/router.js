import { createRouter, createWebHistory } from 'vue-router'
import JobList from './pages/JobList.vue'
import Apply from './pages/Apply.vue'

const routes = [
  { path: '/', component: JobList },
  { path: '/apply/:id', component: Apply },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
