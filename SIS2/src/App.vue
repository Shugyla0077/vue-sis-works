<script>
import TaskItem from './components/TaskItem.vue'
import TaskForm from './components/TaskForm.vue'
import TaskStats from './components/TaskStats.vue'

export default {
  name: 'App',
  components: { TaskItem, TaskForm, TaskStats },
  data() {
    return {
      tasks: [],
      search: '',
      priorityFilter: 'all', // all | low | medium | high
      statusFilter: 'all',   // all | active | completed
      nextId: 1
    }
  },
  computed: {
    filteredTasks() {
      const q = this.search.trim().toLowerCase()
      return this.tasks.filter(t =>
        t.title.toLowerCase().includes(q) &&
        (this.priorityFilter === 'all' || t.priority === this.priorityFilter) &&
        (this.statusFilter === 'all' ||
          (this.statusFilter === 'completed') === t.completed)
      )
    },
    totalCount() { return this.tasks.length },
    completedCount() { return this.tasks.filter(t => t.completed).length },
    activeCount() { return this.totalCount - this.completedCount }
  },
  watch: {
    // Save to localStorage on every change
    tasks: {
      deep: true,
      handler(value) { localStorage.setItem('tasks', JSON.stringify(value)) }
    }
  },
  // Lifecycle hook 1: load saved data
  created() {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      this.tasks = JSON.parse(saved)
      this.nextId = Math.max(0, ...this.tasks.map(t => t.id)) + 1
    }
  },
  // Lifecycle hook 2: runs after the component is in the DOM
  mounted() {
    document.title = 'Task Manager'
    console.log('App mounted, tasks loaded:', this.tasks.length)
  },
  methods: {
    addTask(data) {
      this.tasks.unshift({
        id: this.nextId++, ...data,
        completed: false, createdAt: new Date().toISOString()
      })
    },
    deleteTask(id) { this.tasks = this.tasks.filter(t => t.id !== id) },
    toggleComplete(id) {
      const t = this.tasks.find(t => t.id === id)
      if (t) t.completed = !t.completed
    },
    updateTask(id, data) {
      const t = this.tasks.find(t => t.id === id)
      if (t) Object.assign(t, data)
    },
    changePriority(id, priority) { this.updateTask(id, { priority }) }
  }
}
</script>

<template>
  <main class="container">
    <h1>Task Manager</h1>

    <TaskStats :total="totalCount" :active="activeCount" :completed="completedCount" />

    <BaseCard class="block">
      <template #header>New task</template>
      <TaskForm @submit="addTask" />
    </BaseCard>

    <div class="filters">
      <input v-model="search" placeholder="Search by title" />
      <select v-model="priorityFilter">
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select v-model="statusFilter">
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <p v-if="!filteredTasks.length" class="empty">No tasks found. Add one above.</p>
    <div class="list">
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task"
                @delete="deleteTask" @complete="toggleComplete"
                @update="updateTask" @change-priority="changePriority" />
    </div>
  </main>
</template>

<style>
body { margin: 0; background: #f4f5f7; font-family: system-ui, sans-serif; color: #1c1e21; }
.container { max-width: 720px; margin: 0 auto; padding: 24px 16px; }
.block { margin: 16px 0; }
.filters { display: flex; gap: 8px; margin-bottom: 16px; }
.filters input { flex: 1; }
.filters input, .filters select { padding: 8px; border: 1px solid #c9ccd3; border-radius: 6px; font: inherit; }
.list { display: flex; flex-direction: column; gap: 12px; }
.empty { color: #666; text-align: center; }
</style>
