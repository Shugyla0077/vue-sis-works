<script>
export default {
  name: 'HomeView',
  computed: {
    isLogged() {
      return Boolean(localStorage.getItem('auth_user'))
    }
  }
}
</script>

<template>
  <section class="card">
    <h1>Welcome to PostHub (SIS 3)</h1>
    <p>
      Multi-page Vue 3 application using <strong>Vue Router</strong> and <strong>Axios</strong>
      with public mock API (JSONPlaceholder).
    </p>

    <div class="features">
      <div class="card">
        <h3>📝 Posts CRUD</h3>
        <p>Create, Read, Update, and Delete posts via Axios requests (protected by Auth).</p>
        <router-link to="/posts" class="btn btn-primary">Go to Posts</router-link>
      </div>

      <div class="card">
        <h3>👥 Authors Directory</h3>
        <p>Browse public authors fetched from the `/users` endpoint.</p>
        <router-link to="/users" class="btn">View Authors</router-link>
      </div>

      <div class="card">
        <h3>🔒 Authorization & 404</h3>
        <p>Status: <strong>{{ isLogged ? 'Logged in' : 'Guest (Not logged in)' }}</strong></p>
        <router-link to="/unknown-page-test" class="btn">Test 404 Page</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 16px; }
.btn { display: inline-block; text-decoration: none; margin-top: 8px; }
</style>