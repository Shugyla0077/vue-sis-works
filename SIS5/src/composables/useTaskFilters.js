import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/taskStore'

export function useTaskFilters() {
  const store = useTaskStore()
  const {
    tasks,
    searchQuery,
    statusFilter,
    priorityFilter,
    categoryFilter
  } = storeToRefs(store)

  const categories = computed(() => {
    const unique = new Set(tasks.value.map(t => t.category))
    return ['Development', 'Architecture', 'UI/UX', 'Submission', 'General', ...unique].filter(
      (val, idx, arr) => arr.indexOf(val) === idx
    )
  })

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesSearch =
        !searchQuery.value.trim() ||
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesStatus =
        statusFilter.value === 'all' ||
        (statusFilter.value === 'completed' && task.completed) ||
        (statusFilter.value === 'pending' && !task.completed)

      const matchesPriority =
        priorityFilter.value === 'all' || task.priority === priorityFilter.value

      const matchesCategory =
        categoryFilter.value === 'all' || task.category === categoryFilter.value

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory
    })
  })

  function getPriorityColor(priority) {
    const map = {
      high: 'red',
      medium: 'orange',
      low: 'blue'
    }
    return map[priority] || 'default'
  }

  return {
    searchQuery,
    statusFilter,
    priorityFilter,
    categoryFilter,
    categories,
    filteredTasks,
    resetFilters: store.resetFilters,
    getPriorityColor
  }
}
