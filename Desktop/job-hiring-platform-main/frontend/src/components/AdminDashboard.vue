<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, Admin!</p>

    <button @click="goToManageJobs">Manage Jobs</button>
    <button @click="goToManageCandidates">Manage Candidates</button>
    <button @click="goToManageExams">Manage Exams</button>
    <button @click="goToManageQuestions">Manage Questions</button> <!-- ✅ New Button -->
  </div>
</template>

<script>
export default {
  methods: {
    goToManageJobs() {
      this.$router.push("/admin/manage-jobs");
    },
    goToManageCandidates() {
      this.$router.push("/admin/manage-candidates");
    },
    goToManageExams() {
      this.$router.push("/admin/manage-exams");
    },
    goToManageQuestions() {
      this.$router.push("/admin/manage-questions"); // ✅ New Route
    }
  }
};
</script>

<style>
button {
  margin: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
