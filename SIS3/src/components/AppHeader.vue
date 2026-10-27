<script>
export default {
  name: 'AppHeader',
  props: {
    user: { type: String, default: null }
  },
  emits: ['logout']
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">KBTU · PostHub</router-link>

      <nav class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/posts">Posts (CRUD)</router-link>
        <router-link to="/users">Authors</router-link>
      </nav>

      <div class="auth-box">
        <template v-if="user">
          <span class="username">👤 {{ user }}</span>
          <button class="btn-outline" @click="$emit('logout')">Logout</button>
        </template>
        <router-link v-else to="/login" class="btn-login">Login</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header { background: #1e293b; color: #fff; padding: 14px 20px; position: sticky; top: 0; z-index: 10; }
.header-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.logo { color: #fff; text-decoration: none; font-weight: 700; font-size: 18px; }
.nav { display: flex; gap: 16px; }
.nav a { color: #cbd5e1; text-decoration: none; font-weight: 500; padding: 6px 10px; border-radius: 6px; }
.nav a.router-link-active { background: #334155; color: #fff; }
.auth-box { display: flex; align-items: center; gap: 10px; }
.username { font-size: 14px; color: #e2e8f0; }
.btn-outline { background: transparent; color: #fff; border: 1px solid #64748b; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
.btn-outline:hover { background: #334155; }
.btn-login { background: #3b82f6; color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-weight: 500; }
</style>