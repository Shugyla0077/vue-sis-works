import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/taskStore'

export function useTaskActions() {
  const store = useTaskStore()
  const {
    totalCount,
    completedCount,
    pendingCount,
    highPriorityPendingCount,
    completionRate
  } = storeToRefs(store)

  const isModalOpen = ref(false)
  const editingTaskId = ref(null)

  const formState = reactive({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Development',
    dueDate: new Date().toISOString().slice(0, 10)
  })

  function openCreateModal() {
    editingTaskId.value = null
    formState.title = ''
    formState.description = ''
    formState.priority = 'medium'
    formState.category = 'Development'
    formState.dueDate = new Date().toISOString().slice(0, 10)
    isModalOpen.value = true
  }

  function openEditModal(task) {
    editingTaskId.value = task.id
    formState.title = task.title
    formState.description = task.description
    formState.priority = task.priority
    formState.category = task.category
    formState.dueDate = task.dueDate
    isModalOpen.value = true
  }

  function submitTaskForm() {
    if (!formState.title.trim()) {
      message.warning('Please enter a task title')
      return false
    }

    if (editingTaskId.value) {
      store.updateTask(editingTaskId.value, {
        title: formState.title.trim(),
        description: formState.description.trim(),
        priority: formState.priority,
        category: formState.category,
        dueDate: formState.dueDate
      })
      message.success('Task updated successfully')
    } else {
      store.addTask({
        title: formState.title.trim(),
        description: formState.description.trim(),
        priority: formState.priority,
        category: formState.category,
        dueDate: formState.dueDate
      })
      message.success('New task created!')
    }

    isModalOpen.value = false
    return true
  }

  function handleToggleStatus(task) {
    store.toggleTaskStatus(task.id)
    message.info(task.completed ? 'Task marked as completed' : 'Task reopened')
  }

  function handleDeleteTask(id) {
    store.deleteTask(id)
    message.success('Task deleted')
  }

  function handleClearCompleted() {
    if (completedCount.value === 0) {
      message.info('No completed tasks to clear')
      return
    }
    store.clearCompleted()
    message.success('Cleared all completed tasks')
  }

  return {
    totalCount,
    completedCount,
    pendingCount,
    highPriorityPendingCount,
    completionRate,
    isModalOpen,
    editingTaskId,
    formState,
    openCreateModal,
    openEditModal,
    submitTaskForm,
    handleToggleStatus,
    handleDeleteTask,
    handleClearCompleted
  }
}
