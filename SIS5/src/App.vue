<script setup>
import TaskStats from './components/TaskStats.vue'
import TaskFilters from './components/TaskFilters.vue'
import TaskList from './components/TaskList.vue'
import TaskFormModal from './components/TaskFormModal.vue'
import { useTaskActions } from './composables/useTaskActions'

const {
  isModalOpen,
  editingTaskId,
  formState,
  openCreateModal,
  openEditModal,
  submitTaskForm,
  handleToggleStatus,
  handleDeleteTask,
  handleClearCompleted
} = useTaskActions()
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <div class="logo-title">
        <span class="badge-icon">🗂️</span>
        <h2 style="margin: 0; color: #fff; font-size: 18px">
          KBTU Task Management — SIS 5
        </h2>
      </div>
      <div class="header-tags">
        <a-tag color="cyan">Vue 3</a-tag>
        <a-tag color="gold">Pinia Store</a-tag>
        <a-tag color="geekblue">Composables</a-tag>
        <a-tag color="blue">Ant Design Vue</a-tag>
      </div>
    </a-layout-header>

    <a-layout-content class="main-content">
      <div class="container">
        <a-page-header
          title="Task Management Workspace"
          sub-title="State managed with Pinia & Vue 3 Composition API Composables"
          style="padding: 0 0 16px 0"
        />

        <!-- Statistics Component -->
        <TaskStats />

        <!-- Filters & Actions Component -->
        <TaskFilters
          @open-create="openCreateModal"
          @clear-completed="handleClearCompleted"
        />

        <!-- Task List Component -->
        <TaskList
          @toggle-status="handleToggleStatus"
          @edit-task="openEditModal"
          @delete-task="handleDeleteTask"
        />

        <!-- Create / Edit Task Modal Component -->
        <TaskFormModal
          v-model:open="isModalOpen"
          :is-editing="Boolean(editingTaskId)"
          :form-state="formState"
          @submit="submitTaskForm"
        />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #001529;
}
.logo-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.badge-icon {
  font-size: 20px;
}
.header-tags {
  display: flex;
  gap: 6px;
}
.main-content {
  padding: 24px;
  background: #f5f7fa;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}
</style>
