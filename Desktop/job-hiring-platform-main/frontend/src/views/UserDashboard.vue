<!-- src/views/UserDashboard.vue -->
<template>
  <div class="p-6 text-center">
    <h1 class="text-2xl font-bold mb-6">Welcome, {{ userName }}</h1>
    <div class="flex justify-center gap-4">
      <router-link to="/joblist">
        <button class="btn">View Job List</button>
      </router-link>
      <router-link to="/user/exams">
        <button class="btn">Take Exam</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// Simulate getting the logged-in user name (replace this later with real auth)
const userName = ref('Candidate')

onMounted(() => {
  // You could fetch actual user data here from localStorage or backend
})
</script>

<style scoped>
.btn {
  background-color: #2563eb;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  transition: 0.3s;
}
.btn:hover {
  background-color: #1d4ed8;
}
</style>
