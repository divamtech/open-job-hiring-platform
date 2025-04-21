<template>
  <div class="login-container">
    <h2 class="text-xl font-bold mb-4">User Login</h2>
    <form @submit.prevent="login" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="w-full p-2 border rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="w-full p-2 border rounded"
      />
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
  if (email.value && password.value) {
    // Simple login logic (replace with backend auth if needed)
    localStorage.setItem("userLoggedIn", "true");
    router.push("/dashboard");
  } else {
    alert("Please enter email and password");
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>
