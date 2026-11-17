<script setup>
import { useTaskFilters } from '../composables/useTaskFilters'

const emit = defineEmits(['toggle-status', 'edit-task', 'delete-task'])

const { filteredTasks, getPriorityColor } = useTaskFilters()
</script>

<template>
  <a-card title="Tasks List">
    <a-empty
      v-if="filteredTasks.length === 0"
      description="No tasks match your current filters"
    />

    <a-list
      v-else
      :data-source="filteredTasks"
      item-layout="horizontal"
      bordered
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.description || 'No description provided'">
            <template #title>
              <div class="task-title-row">
                <a-checkbox
                  :checked="item.completed"
                  @change="emit('toggle-status', item)"
                >
                  <span
                    class="task-title"
                    :class="{ 'completed-text': item.completed }"
                  >
                    {{ item.title }}
                  </span>
                </a-checkbox>

                <a-tag :color="getPriorityColor(item.priority)">
                  {{ item.priority.toUpperCase() }}
                </a-tag>
                <a-tag color="purple">{{ item.category }}</a-tag>
                <a-tag>Due: {{ item.dueDate }}</a-tag>
              </div>
            </template>
          </a-list-item-meta>

          <template #actions>
            <a-tag :color="item.completed ? 'success' : 'processing'">
              {{ item.completed ? 'Completed' : 'In Progress' }}
            </a-tag>
            <a-button size="small" @click="emit('edit-task', item)">Edit</a-button>
            <a-popconfirm
              title="Delete this task?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="emit('delete-task', item.id)"
            >
              <a-button danger size="small">Delete</a-button>
            </a-popconfirm>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<style scoped>
.task-title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.task-title {
  font-weight: 600;
  font-size: 15px;
}
.completed-text {
  text-decoration: line-through;
  color: #8c8c8c;
}
</style>
