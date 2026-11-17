<script setup>
import { useTaskFilters } from '../composables/useTaskFilters'

const emit = defineEmits(['open-create', 'clear-completed'])

const {
  searchQuery,
  statusFilter,
  priorityFilter,
  categoryFilter,
  categories,
  resetFilters
} = useTaskFilters()
</script>

<template>
  <a-card style="margin-bottom: 20px">
    <a-row :gutter="[12, 12]" align="middle">
      <a-col :xs="24" :md="7">
        <a-input-search
          v-model:value="searchQuery"
          placeholder="Search tasks by title or description..."
          allow-clear
        />
      </a-col>

      <a-col :xs="12" :md="4">
        <a-select v-model:value="statusFilter" style="width: 100%">
          <a-select-option value="all">All Statuses</a-select-option>
          <a-select-option value="pending">Pending</a-select-option>
          <a-select-option value="completed">Completed</a-select-option>
        </a-select>
      </a-col>

      <a-col :xs="12" :md="4">
        <a-select v-model:value="priorityFilter" style="width: 100%">
          <a-select-option value="all">All Priorities</a-select-option>
          <a-select-option value="high">High Priority</a-select-option>
          <a-select-option value="medium">Medium Priority</a-select-option>
          <a-select-option value="low">Low Priority</a-select-option>
        </a-select>
      </a-col>

      <a-col :xs="12" :md="4">
        <a-select v-model:value="categoryFilter" style="width: 100%">
          <a-select-option value="all">All Categories</a-select-option>
          <a-select-option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </a-select-option>
        </a-select>
      </a-col>

      <a-col :xs="12" :md="5" style="display: flex; gap: 8px; justify-content: flex-end">
        <a-button @click="resetFilters">Reset</a-button>
        <a-button danger @click="emit('clear-completed')">Clear Done</a-button>
        <a-button type="primary" @click="emit('open-create')">+ New Task</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
