<script>
import { postsApi } from '../api'

export default {
  name: 'PostsView',
  data() {
    return {
      posts: [],
      loading: false,
      error: null,
      submitting: false,
      // Form state for Create & Update
      editingId: null,
      formTitle: '',
      formBody: ''
    }
  },
  created() {
    this.fetchPosts()
  },
  methods: {
    // READ (GET)
    async fetchPosts() {
      this.loading = true
      this.error = null
      try {
        const res = await postsApi.getAll()
        this.posts = res.data
      } catch (err) {
        this.error = err.message || 'Failed to load posts'
      } finally {
        this.loading = false
      }
    },

    // CREATE (POST) or UPDATE (PUT)
    async savePost() {
      if (!this.formTitle.trim() || !this.formBody.trim()) return
      this.submitting = true
      this.error = null

      const payload = {
        title: this.formTitle.trim(),
        body: this.formBody.trim(),
        userId: 1
      }

      try {
        if (this.editingId) {
          // UPDATE via Axios PUT
          const res = await postsApi.update(this.editingId, payload)
          const idx = this.posts.findIndex(p => p.id === this.editingId)
          if (idx !== -1) this.posts[idx] = { ...this.posts[idx], ...res.data }
        } else {
          // CREATE via Axios POST
          const res = await postsApi.create(payload)
          this.posts.unshift({ ...res.data, id: Date.now() })
        }
        this.resetForm()
      } catch (err) {
        this.error = 'Failed to save post: ' + (err.message || 'Unknown error')
      } finally {
        this.submitting = false
      }
    },

    // Start editing existing post
    startEdit(post) {
      this.editingId = post.id
      this.formTitle = post.title
      this.formBody = post.body
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    resetForm() {
      this.editingId = null
      this.formTitle = ''
      this.formBody = ''
    },

    // DELETE via Axios DELETE
    async deletePost(id) {
      try {
        await postsApi.remove(id)
        this.posts = this.posts.filter(p => p.id !== id)
      } catch (err) {
        this.error = 'Failed to delete post: ' + (err.message || 'Unknown error')
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Posts Manager (CRUD)</h1>

    <!-- CREATE / UPDATE FORM -->
    <section class="card">
      <h3>{{ editingId ? 'Edit Post #' + editingId : 'Create New Post' }}</h3>
      <form @submit.prevent="savePost">
        <input v-model="formTitle" class="input" placeholder="Post title" required />
        <textarea v-model="formBody" class="textarea" rows="3" placeholder="Post content" required></textarea>
        <div class="actions">
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? 'Saving...' : (editingId ? 'Update (PUT)' : 'Create (POST)') }}
          </button>
          <button v-if="editingId" type="button" class="btn" @click="resetForm">Cancel</button>
        </div>
      </form>
    </section>

    <!-- LOADING STATE -->
    <div v-if="loading" class="status-box">
      ⏳ Loading posts from API...
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="status-box error-box">
      <p>⚠️ {{ error }}</p>
      <button class="btn" @click="fetchPosts">Retry</button>
    </div>

    <!-- POSTS LIST -->
    <div v-else>
      <article v-for="post in posts" :key="post.id" class="card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <div class="actions">
          <!-- Dynamic Routing link -->
          <router-link :to="`/posts/${post.id}`" class="btn">Read & Comments</router-link>
          <button class="btn" @click="startEdit(post)">Edit</button>
          <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
a.btn { text-decoration: none; color: inherit; }
</style>