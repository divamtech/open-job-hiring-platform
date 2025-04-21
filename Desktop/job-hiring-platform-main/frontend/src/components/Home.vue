<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Welcome to the Hiring Platform</h1>

      <div class="flex flex-col gap-4">
        <router-link to="/admin/login">
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
            Admin Login
          </button>
        </router-link>

        <router-link to="/user/login">
          <button class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
            User Login
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* All styling is done with TailwindCSS classes directly in the template */
</style>
