<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Exam Manager</h2>

    <form @submit.prevent="handleSubmit" class="space-y-2">
      <input v-model="form.title" placeholder="Title" class="input" />
      <input v-model="form.category" placeholder="Category" class="input" />
      <input v-model="form.description" placeholder="Description" class="input" />
      <input v-model="form.duration" type="number" placeholder="Duration (min)" class="input" />
      <input v-model="form.total_marks" type="number" placeholder="Total Marks" class="input" />
    <input v-model="form.pass_percentage" type="number" placeholder="Passing %" class="input" />
      <button class="btn" :disabled="loading">{{ form.id ? 'Update' : 'Save' }}</button>
    </form>

    <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>

    <hr class="my-4" />

    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exam in exams" :key="exam.id">
          <td>{{ exam.title }}</td>
          <td>{{ exam.category }}</td>
          <td>
            <button @click="editExam(exam)" class="text-blue-500">Edit</button>
            <button @click="deleteExam(exam.id)" class="text-red-500 ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const exams = ref([])
const loading = ref(false)
const message = ref('')
const form = ref({
  id: null,
  title: '',
  category: '',
  description: '',
  duration: '',
  total_marks: '',
  passing_marks: ''
})

const fetchExams = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/exams')
    exams.value = data
  } catch (err) {
    console.error("Error fetching exams", err)
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    if (form.value.id) {
      await axios.put(`http://localhost:3000/api/exams/${form.value.id}`, form.value)
      message.value = 'Exam updated successfully!'
    } else {
      await axios.post('http://localhost:3000/api/exams', form.value)
      message.value = 'Exam created successfully!'
    }
    resetForm()
    fetchExams()
  } catch (err) {
    console.error("Error saving exam", err)
    message.value = 'Something went wrong!'
  } finally {
    loading.value = false
    setTimeout(() => message.value = '', 3000)
  }
}

const deleteExam = async (id) => {
  if (confirm('Delete this exam?')) {
    try {
      await axios.delete(`http://localhost:3000/api/exams/${id}`)
      message.value = 'Exam deleted.'
      fetchExams()
    } catch (err) {
      console.error("Error deleting exam", err)
    }
  }
}

const editExam = (exam) => {
  form.value = { ...exam }
}

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    category: '',
    description: '',
    duration: '',
    total_marks: '',
    passing_marks: ''
  }
}
onMounted(fetchExams)
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}
.btn {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
