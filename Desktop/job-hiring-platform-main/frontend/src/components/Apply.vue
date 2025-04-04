<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">Apply for {{ job?.title }}</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input v-model="form.name" placeholder="Full Name" class="input" required />
      <input v-model="form.email" placeholder="Email" class="input" type="email" required />
      <input v-model="form.phone" placeholder="Phone" class="input" required />
      <input type="file" @change="handleFile" class="input" required />
      <textarea v-model="form.coverLetter" placeholder="Cover Letter" class="input" required></textarea>
      <input v-model="form.portfolio" placeholder="Portfolio URL" class="input" type="url" />
      <button type="submit" class="btn">Submit</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const job = ref(null)
const form = ref({ name: '', email: '', phone: '', coverLetter: '', portfolio: '', file: null })

onMounted(async () => {
  const res = await axios.get(`/api/job/${route.params.id}`)
  job.value = res.data
})

const handleFile = (e) => {
  form.value.file = e.target.files[0]
}

const submitForm = async () => {
  const data = new FormData();

  // Append normal fields (except file)
  Object.entries(form.value).forEach(([key, val]) => {
    if (key !== "file") data.append(key, val);
  });

  // Append the file with the key 'resume' (as expected by backend)
  data.append("resume", form.value.file);

  // Also pass job ID
  data.append("jobId", route.params.id);

  await axios.post("/api/apply", data);
  alert("Application Submitted");
};

</script>
