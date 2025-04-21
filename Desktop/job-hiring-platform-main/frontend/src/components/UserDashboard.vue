<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Welcome, {{ user.name }}</h2>

    <h3 class="text-lg font-semibold">Assigned Exams</h3>
    <div v-if="assignedExams.length > 0">
      <ul>
        <li v-for="exam in assignedExams" :key="exam.exam_id" class="mb-2">
          <div class="flex justify-between items-center">
            <span>{{ exam.title }}</span>
            <router-link :to="`/start-exam/${exam.exam_id}`" class="btn">Start Exam</router-link>
          </div>
        </li>
      </ul>
    </div>
    <p v-else>No exams assigned yet.</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const assignedExams = ref([])
const user = ref({
  id: 1, // You can replace with localStorage or actual login session user
  name: 'Test User'
})

const fetchAssignedExams = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/assigned-exams/${user.value.id}`)
  assignedExams.value = data
}

onMounted(fetchAssignedExams)
</script>

<style scoped>
.btn {
  background-color: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
}
</style>
