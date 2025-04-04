<template>
  <div>
    <h2>Candidate Detail</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="candidate">
      <p><strong>Name:</strong> {{ candidate.name }}</p>
      <p><strong>Email:</strong> {{ candidate.email }}</p>
      <p><strong>Phone:</strong> {{ candidate.phone }}</p>
      <p><strong>Portfolio:</strong> {{ candidate.portfolio }}</p>
      <p><strong>Status:</strong> {{ candidate.status }}</p>
      <p><strong>Resume:</strong> 
        <a :href="candidate.resume" target="_blank">Download</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['id'],
  data() {
    return {
      candidate: null,
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchCandidate();
  },
  methods: {
    async fetchCandidate() {
      try {
        const res = await axios.get(`http://localhost:5000/api/candidate/${this.id}`);
        this.candidate = res.data;
      } catch (err) {
        this.error = "Candidate not found.";
        console.error("❌ Error fetching candidate detail:", err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
