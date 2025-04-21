<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Exam: {{ exam.title }}</h2>

    <div v-if="!examCompleted">
      <div v-if="questions.length > 0">
        <div v-for="(q, index) in questions" :key="q.id" class="mb-4">
          <p class="font-semibold">{{ index + 1 }}. {{ q.question_text }}</p>
          <div v-for="opt in ['a', 'b', 'c', 'd']" :key="opt" class="ml-4">
            <label class="block">
              <input
                type="radio"
                :name="'q' + q.id"
                :value="opt"
                v-model="userAnswers[q.id]"
              />
              {{ q['option_' + opt] }}
            </label>
          </div>
        </div>
        <button @click="submitExam"  class="btn mt-4">Submit Exam</button>
      </div>
      <div v-else>
        <p>No questions found for this exam.</p>
      </div>
    </div>

    <div v-else>
      <h3 class="text-green-600 text-lg">Exam Complete!</h3>
      <p>Your score: {{ score }}/{{ questions.length }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const examId = route.params.examId

const exam = ref({})
const questions = ref([])
const userAnswers = ref({})
const examCompleted = ref(false)
const score = ref(0)

const candidate_id = ref(1); // Set proper candidate_id (could be from localStorage or login system)
const user_id = ref(1);      // Set proper user_id (could be from session, etc.)

const fetchExam = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/exams/${examId}`)
    exam.value = data
  } catch (error) {
    console.error("Error fetching exam:", error)
  }
}

const fetchQuestions = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/questions/exam/${examId}`)
    questions.value = data
  } catch (error) {
    console.error("Error fetching questions:", error)
  }
}

const submitExam = async () => {
  let correctCount = 0;

  questions.value.forEach((q) => {
    const userAnswer = userAnswers.value[q.id] || '';
    const correctOption = q.correct_option || '';
    const isCorrect = userAnswer.toLowerCase() === correctOption.toLowerCase();
    if (isCorrect) correctCount++;
  });

  score.value = correctCount;
  examCompleted.value = true;

  const resultData = {
    candidate_id: candidate_id.value,
    exam_id: examId,
    score: correctCount,
    total_questions: questions.value.length,
    passed: correctCount >= (questions.value.length * exam.value.pass_percentage / 100)
  };

  try {
    const res = await axios.post('http://localhost:3000/api/exam-results', resultData);
    console.log("✅ Exam result saved:", res.data);
  } catch (error) {
    console.error("❌ Error saving exam result:", error);
  }
}

onMounted(() => {
  fetchExam()
  fetchQuestions()
})
</script>

<style scoped>
.btn {
  background-color: #2563eb;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
