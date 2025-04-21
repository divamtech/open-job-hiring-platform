<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Question Manager</h2>

    <form @submit.prevent="handleSubmit" class="space-y-2">
      <!-- Dropdown instead of input for exam_id -->
      <select v-model="form.exam_id" class="input" required>
        <option disabled value="">Select Exam</option>
        <option v-for="exam in exams" :key="exam.id" :value="exam.id">
          {{ exam.title }}
        </option>
      </select>

      <input v-model="form.question_text" placeholder="Question Text" class="input" />
      <input v-model="form.option_a" placeholder="Option A" class="input" />
      <input v-model="form.option_b" placeholder="Option B" class="input" />
      <input v-model="form.option_c" placeholder="Option C" class="input" />
      <input v-model="form.option_d" placeholder="Option D" class="input" />
      <input v-model="form.correct_option" placeholder="Correct Option (A/B/C/D)" class="input" />

      <select v-model="form.difficulty" class="input">
        <option disabled value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select v-model="form.type" class="input">
        <option disabled value="">Select Type</option>
        <option value="mcq">MCQ</option>
        <option value="true_false">True/False</option>
      </select>

      <button class="btn" :disabled="loading">{{ form.id ? "Update" : "Save" }}</button>
    </form>

    <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>

    <hr class="my-4" />

    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Question</th>
          <th>Correct Option</th>
          <th>Difficulty</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="q in questions" :key="q.id">
          <td>{{ q.question_text }}</td>
          <td>{{ q.correct_option }}</td>
          <td>{{ q.difficulty }}</td>
          <td>{{ q.type }}</td>
          <td>
            <button @click="editQuestion(q)" class="text-blue-500">Edit</button>
            <button @click="deleteQuestion(q.id)" class="text-red-500 ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"

const questions = ref([])
const exams = ref([]) // Holds the list of exams
const loading = ref(false)
const message = ref("")

const form = ref({
  id: null,
  exam_id: "",
  question_text: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  correct_option: "",
  difficulty: "",
  type: "",
})

const fetchQuestions = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/questions")
    questions.value = data
  } catch (err) {
    console.error("Error fetching questions", err)
  }
}

const fetchExams = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/exams")
    exams.value = data
  } catch (err) {
    console.error("Error fetching exams", err)
  }
}

const handleSubmit = async () => {
  if (
    !form.value.exam_id ||
    !form.value.question_text ||
    !form.value.correct_option ||
    !form.value.difficulty ||
    !form.value.type
  ) {
    message.value = "Please fill in all required fields."
    return
  }
  try {
    loading.value = true

    if (form.value.id) {
      await axios.put(`http://localhost:3000/api/questions/${form.value.id}`, form.value)
      message.value = "Question updated!"
    } else {
      await axios.post("http://localhost:3000/api/questions", form.value)
      message.value = "Question added!"
    }

    resetForm()
    fetchQuestions()
  } catch (err) {
    console.error("Error saving question", err)
    message.value = "Something went wrong!"
  } finally {
    loading.value = false
    setTimeout(() => (message.value = ""), 3000)
  }
}

const deleteQuestion = async (id) => {
  if (confirm("Are you sure to delete?")) {
    try {
      await axios.delete(`http://localhost:3000/api/questions/${id}`)
      message.value = "Deleted successfully!"
      fetchQuestions()
    } catch (err) {
      console.error("Error deleting question", err)
    }
  }
}

const editQuestion = (q) => {
  form.value = { ...q }
}

const resetForm = () => {
  form.value = {
    id: null,
    exam_id: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "",
    difficulty: "",
    type: "",
  }
}

onMounted(() => {
  fetchQuestions()
  fetchExams()
})
</script>

<style scoped>
* {
  margin: 2px;
}
.input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
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
