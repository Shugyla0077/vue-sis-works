<script>
import { postsApi } from '../api'

export default {
  name: 'PostDetailView',
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      post: null,
      comments: [],
      loading: false,
      error: null
    }
  },
  watch: {
    // Reload if dynamic route param :id changes
    id: {
      immediate: true,
      handler() {
        this.loadPostDetails()
      }
    }
  },
  methods: {
    async loadPostDetails() {
      this.loading = true
      this.error = null
      try {
        const [postRes, commentsRes] = await Promise.all([
          postsApi.getById(this.id),
          postsApi.getComments(this.id)
        ])
        this.post = postRes.data
        this.comments = commentsRes.data
      } catch (err) {
        this.error = 'Could not load post #' + this.id + ' (' + err.message + ')'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div>
    <button class="btn" @click="$router.push('/posts')">← Back to Posts</button>

    <div v-if="loading" class="status-box">
      ⏳ Loading post #{{ id }}...
    </div>

    <div v-else-if="error" class="status-box error-box">
      <p>⚠️ {{ error }}</p>
      <button class="btn" @click="loadPostDetails">Retry</button>
    </div>

    <div v-else-if="post" class="detail-wrap">
      <article class="card">
        <span class="badge">Post ID: {{ post.id }}</span>
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
      </article>

      <h3>Comments ({{ comments.length }})</h3>
      <div v-for="c in comments" :key="c.id" class="card">
        <strong>{{ c.name }}</strong> <span class="email">({{ c.email }})</span>
        <p>{{ c.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-wrap { margin-top: 16px; }
.badge { background: #dbeafe; color: #1d4ed8; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; }
.email { color: #64748b; font-size: 13px; }
</style>