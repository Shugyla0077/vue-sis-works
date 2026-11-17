import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  // State variables stored in Pinia
  const tasks = ref([
    {
      id: 1,
      title: 'Setup Vue 3 project with Vite',
      description: 'Initialize project structure and configure dependencies',
      priority: 'high',
      category: 'Development',
      dueDate: '2026-11-18',
      completed: true
    },
    {
      id: 2,
      title: 'Configure Pinia state management store',
      description: 'Store reactive variables, getters, and task actions in Pinia',
      priority: 'high',
      category: 'Architecture',
      dueDate: '2026-11-19',
      completed: true
    },
    {
      id: 3,
      title: 'Build UI components with Ant Design Vue',
      description: 'Implement task cards, statistics, filters, and modal forms',
      priority: 'medium',
      category: 'UI/UX',
      dueDate: '2026-11-20',
      completed: false
    },
    {
      id: 4,
      title: 'Refactor logic into Vue 3 Composables',
      description: 'Create reusable composables for task filtering and form actions',
      priority: 'high',
      category: 'Development',
      dueDate: '2026-11-21',
      completed: false
    },
    {
      id: 5,
      title: 'Prepare SIS 5 repository submission',
      description: 'Test production build and push code to Git repository',
      priority: 'low',
      category: 'Submission',
      dueDate: '2026-11-22',
      completed: false
    }
  ])

  const searchQuery = ref('')
  const statusFilter = ref('all')
  const priorityFilter = ref('all')
  const categoryFilter = ref('all')

  // Getters
  const totalCount = computed(() => tasks.value.length)
  const completedCount = computed(() => tasks.value.filter(t => t.completed).length)
  const pendingCount = computed(() => tasks.value.filter(t => !t.completed).length)
  const highPriorityPendingCount = computed(() =>
    tasks.value.filter(t => !t.completed && t.priority === 'high').length
  )
  const completionRate = computed(() => {
    if (!tasks.value.length) return 0
    return Math.round((completedCount.value / tasks.value.length) * 100)
  })

  // Actions
  function addTask(taskData) {
    tasks.value.unshift({
      id: Date.now(),
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'General',
      dueDate: taskData.dueDate || new Date().toISOString().slice(0, 10),
      completed: false
    })
  }

  function updateTask(id, updatedFields) {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedFields }
    }
  }

  function toggleTaskStatus(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function clearCompleted() {
    tasks.value = tasks.value.filter(t => !t.completed)
  }

  function resetFilters() {
    searchQuery.value = ''
    statusFilter.value = 'all'
    priorityFilter.value = 'all'
    categoryFilter.value = 'all'
  }

  return {
    tasks,
    searchQuery,
    statusFilter,
    priorityFilter,
    categoryFilter,
    totalCount,
    completedCount,
    pendingCount,
    highPriorityPendingCount,
    completionRate,
    addTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    clearCompleted,
    resetFilters
  }
})
