<!-- Example for listing exams -->
<template>
  <div>
    <h2>Available Exams</h2>
    <ul>
      <li v-for="exam in exams" :key="exam.id">
        {{ exam.title }} - {{ exam.duration }} min
        <button @click="startExam(exam.id)">Take Exam</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exams: [],
    };
  },
  created() {
    // fetch exams from backend
    fetch("http://localhost:3000/api/exams")
      .then((res) => res.json())
      .then((data) => {
        this.exams = data;
      });
  },
  methods: {
    startExam(examId) {
      this.$router.push(`/user/exam/${examId}`);
    },
  },
};
</script>
