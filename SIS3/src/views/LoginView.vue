<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    onLogin() {
      if (this.username.trim().length < 2 || this.password.length < 4) {
        this.error = 'Username must be at least 2 chars and password at least 4 chars.'
        return
      }
      localStorage.setItem('auth_user', this.username.trim())
      const redirectPath = this.$route.query.redirect || '/posts'
      this.$router.push(redirectPath)
    }
  }
}
</script>

<template>
  <section class="card login-card">
    <h2>Authorization</h2>
    <p class="hint">Sign in to access Posts and CRUD operations.</p>

    <p v-if="error" class="status-box error-box">{{ error }}</p>

    <form @submit.prevent="onLogin">
      <label>Username</label>
      <input v-model="username" class="input" placeholder="e.g. shugyla" required />

      <label>Password</label>
      <input v-model="password" type="password" class="input" placeholder="••••" required />

      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </section>
</template>

<style scoped>
.login-card { max-width: 420px; margin: 32px auto; }
.hint { color: #64748b; font-size: 14px; margin-bottom: 16px; }
label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
</style>