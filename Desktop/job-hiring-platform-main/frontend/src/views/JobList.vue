<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Job Openings</h1>
    <div v-for="job in jobs" :key="job.id" class="border rounded p-4 mb-4">
      <h2 class="text-lg font-semibold">{{ job.title }}</h2>
      <p>{{ job.description }}</p>
      <RouterLink :to="`/apply/${job.id}`" class="text-blue-600 mt-2 inline-block">Apply Now</RouterLink>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const jobs = ref([])
onMounted(async () => {
  const res = await axios.get('/api/jobs')
  jobs.value = res.data
})
</script>