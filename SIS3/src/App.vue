<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: { AppHeader },
  data() {
    return {
      user: localStorage.getItem('auth_user') || null
    }
  },
  watch: {
    $route() {
      // Sync user state whenever route changes
      this.user = localStorage.getItem('auth_user') || null
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('auth_user')
      this.user = null
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <AppHeader :user="user" @logout="handleLogout" />
  <main class="container">
    <router-view />
  </main>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; }
.container { max-width: 900px; margin: 0 auto; padding: 24px 16px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 14px; }
.btn { padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; cursor: pointer; font: inherit; }
.btn-primary { background: #2563eb; border-color: #2563eb; color: #fff; }
.btn-danger { background: #dc2626; border-color: #dc2626; color: #fff; }
.input, .textarea { width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font: inherit; margin-bottom: 10px; }
.status-box { padding: 20px; border-radius: 8px; text-align: center; background: #fff; border: 1px solid #e2e8f0; margin: 16px 0; }
.error-box { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
</style>