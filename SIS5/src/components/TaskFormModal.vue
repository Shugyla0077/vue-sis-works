<script setup>
import { useTaskFilters } from '../composables/useTaskFilters'

defineProps({
  open: {
    type: Boolean,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  formState: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:open', 'submit'])

const { categories } = useTaskFilters()
</script>

<template>
  <a-modal
    :open="open"
    :title="isEditing ? 'Edit Task' : 'Create New Task'"
    :ok-text="isEditing ? 'Save Changes' : 'Create Task'"
    @ok="emit('submit')"
    @cancel="emit('update:open', false)"
  >
    <a-form layout="vertical">
      <a-form-item label="Task Title" required>
        <a-input
          v-model:value="formState.title"
          placeholder="Enter task title..."
          @pressEnter="emit('submit')"
        />
      </a-form-item>

      <a-form-item label="Description">
        <a-textarea
          v-model:value="formState.description"
          placeholder="Describe task details..."
          :rows="3"
        />
      </a-form-item>

      <a-row :gutter="12">
        <a-col :span="8">
          <a-form-item label="Priority">
            <a-select v-model:value="formState.priority">
              <a-select-option value="high">High</a-select-option>
              <a-select-option value="medium">Medium</a-select-option>
              <a-select-option value="low">Low</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item label="Category">
            <a-select v-model:value="formState.category">
              <a-select-option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item label="Due Date">
            <a-input v-model:value="formState.dueDate" type="date" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
