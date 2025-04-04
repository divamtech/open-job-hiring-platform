<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Manage Jobs</h1>

    <!-- Add Job Form -->
    <form @submit.prevent="addJob" class="mb-4">
      <input v-model="newJob.title" placeholder="Job Title" class="border p-2 mr-2" />
      <input v-model="newJob.description" placeholder="Description" class="border p-2 mr-2" />
      <button class="bg-blue-500 text-white p-2">Add Job</button>
    </form>

    <!-- Job List -->
    <ul>
      <li v-for="job in jobs" :key="job.id" class="mb-2 border p-2 flex justify-between items-center">
        <div v-if="editingJobId !== job.id">
          <strong>{{ job.title }}</strong> - {{ job.description }}
        </div>

        <!-- Edit Form -->
        <div v-else>
          <input v-model="editJob.title" placeholder="Job Title" class="border w-10 p-1 mr-2" />
          <input v-model="editJob.description" placeholder="Description" class="border p-1 mr-2" />
        </div>

        <div>
          <!-- Action Buttons -->
          <template v-if="editingJobId !== job.id">
            <button @click="startEdit(job)" class="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
            <button @click="deleteJob(job.id)" class="bg-red-500 text-white px-2 py-1">Delete</button>
          </template>

          <template v-else>
            <button @click="updateJob(job.id)" class="bg-green-500 text-white px-2 py-1 mr-2">Save</button>
            <button @click="cancelEdit" class="bg-gray-500 text-white px-2 py-1">Cancel</button>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      jobs: [],
      newJob: {
        title: "",
        description: "",
      },
      editingJobId: null,
      editJob: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async fetchJobs() {
      try {
        const res = await axios.get("http://localhost:3000/api/jobs");
        this.jobs = res.data;
      } catch (error) {
        console.error("❌ Failed to fetch jobs:", error);
      }
    },
    async addJob() {
      try {
        const res = await axios.post("http://localhost:3000/api/jobs", this.newJob);
        this.jobs.push(res.data);
        this.newJob.title = "";
        this.newJob.description = "";
      } catch (error) {
        console.error("❌ Failed to add job:", error);
      }
    },
    async deleteJob(id) {
      try {
        await axios.delete(`http://localhost:3000/api/jobs/${id}`);
        this.jobs = this.jobs.filter((job) => job.id !== id);
      } catch (error) {
        console.error("❌ Failed to delete job:", error);
      }
    },
    startEdit(job) {
      this.editingJobId = job.id;
      this.editJob = { ...job };
    },
    cancelEdit() {
      this.editingJobId = null;
      this.editJob = { title: "", description: "" };
    },
    async updateJob(id) {
      try {
        await axios.put(`http://localhost:3000/api/jobs/${id}`, this.editJob);
        const index = this.jobs.findIndex((j) => j.id === id);
        if (index !== -1) {
          this.jobs[index] = { id, ...this.editJob };
        }
        this.cancelEdit();
      } catch (error) {
        console.error("❌ Failed to update job:", error);
      }
    },
  },
  mounted() {
    this.fetchJobs();
  },
};
</script>

<style scoped>
input {
  width: 200px;
}
</style>
