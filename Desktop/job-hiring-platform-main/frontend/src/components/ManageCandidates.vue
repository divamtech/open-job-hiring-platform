<template>
  <div class="manage-candidates">
    <h1>Manage Candidates</h1>
    <table v-if="candidates.length > 0" class="candidate-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Job ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="candidate in candidates" :key="candidate.id">
          <td>{{ candidate.id }}</td>
          <td>{{ candidate.jobId }}</td> <!-- Added Job ID -->
          <td>{{ candidate.name }}</td>
          <td>{{ candidate.email }}</td>
          <td>{{ candidate.phone }}</td>
          <td>{{ candidate.status }}</td>
          <td>{{ candidate.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-candidates">No candidates found.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      candidates: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/candidates");
      this.candidates = response.data;
    } catch (error) {
      console.error("There was an error fetching the candidates:", error);
    }
  },
};
</script>

<style scoped>
/* Overall container */
.manage-candidates {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Heading */
.manage-candidates h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Table styles */
.candidate-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.candidate-table th,
.candidate-table td {
  padding: 12px 15px;
  text-align: left;
}

.candidate-table thead {
  background-color: #4CAF50;
  color: white;
}

.candidate-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.candidate-table tr:hover {
  background-color: #ddd;
}

/* No candidates message */
.no-candidates {
  text-align: center;
  font-size: 18px;
  color: #888;
}
</style>
