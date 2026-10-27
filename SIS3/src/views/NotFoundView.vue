<script>
export default {
  name: 'NotFoundView'
}
</script>

<template>
  <section class="status-box">
    <h1>404 — Page Not Found</h1>
    <p>Route <code>{{ $route.fullPath }}</code> does not exist.</p>
    <router-link to="/" class="btn btn-primary">Return Home</router-link>
  </section>
</template>

<style scoped>
a.btn { display: inline-block; text-decoration: none; margin-top: 8px; }
</style>