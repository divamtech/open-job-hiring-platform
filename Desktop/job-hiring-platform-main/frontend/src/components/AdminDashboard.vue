<!-- src/components/AdminDashboard.vue -->
<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, Admin!</p>
    <button @click="goToManageJobs">Manage Jobs</button>
    <button @click="goToManageCandidates">Manage Candidates</button>
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
  },
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
