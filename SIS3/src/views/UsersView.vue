<script>
import { usersApi } from '../api'

export default {
  name: 'UsersView',
  data() {
    return {
      users: [],
      loading: false,
      error: null
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const res = await usersApi.getAll()
        this.users = res.data
      } catch (err) {
        this.error = err.message || 'Failed to load authors'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Authors Directory</h1>

    <div v-if="loading" class="status-box">⏳ Loading authors...</div>

    <div v-else-if="error" class="status-box error-box">
      <p>⚠️ {{ error }}</p>
      <button class="btn" @click="fetchUsers">Retry</button>
    </div>

    <div v-else class="grid">
      <div v-for="u in users" :key="u.id" class="card">
        <h3>{{ u.name }}</h3>
        <p>@{{ u.username }} · {{ u.email }}</p>
        <p class="company">🏢 {{ u.company?.name }} ({{ u.address?.city }})</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.company { color: #475569; font-size: 14px; margin: 0; }
</style>