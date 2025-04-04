<template>
  <div class="p-6 text-center">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Hiring Platform</h1>

    <router-link to="/admin/login">
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Admin Login
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
button{
  margin: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
