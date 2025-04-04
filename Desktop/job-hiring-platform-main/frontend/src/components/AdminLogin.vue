<template>
  <div>
    <h1>Admin Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
    <!-- Display a success message if login is successful -->
    <div v-if="loginSuccess" class="success-message">
      Login Successful! Redirecting to dashboard...
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      loginSuccess: false,
    };
  },
  methods: {
    login() {
      // For now, check if the email and password match a hardcoded value
      const hardcodedEmail = "admin@example.com";
      const hardcodedPassword = "password123";

      if (this.email === hardcodedEmail && this.password === hardcodedPassword) {
        this.loginSuccess = true;
        
        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          this.$router.push('/admin/dashboard'); // Redirect to the dashboard
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        alert("Invalid email or password");
      }
    }
  }
};
</script>

<style>
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}
</style>
