<script>
// Reusable component for a single task.
export default {
  name: 'TaskItem',
  props: { task: { type: Object, required: true } },
  emits: ['delete', 'complete', 'update', 'change-priority'],
  data() { return { editing: false } },
  computed: {
    createdText() { return new Date(this.task.createdAt).toLocaleString() },
    statusText() { return this.task.completed ? 'Completed' : 'Active' }
  },
  methods: {
    saveEdit(data) {
      this.$emit('update', this.task.id, data)
      this.editing = false
    }
  }
}
</script>

<template>
  <BaseCard :class="{ done: task.completed }">
    <template #header>
      <span :class="['title', { strike: task.completed }]">{{ task.title }}</span>
      <span class="badge" :class="task.priority">{{ task.priority }}</span>
    </template>

    <TaskForm v-if="editing" :task="task" submit-label="Save"
              @submit="saveEdit" @cancel="editing = false" />
    <template v-else>
      <p class="desc">{{ task.description || 'No description' }}</p>
      <p class="meta">Created: {{ createdText }} · Status: {{ statusText }}</p>
      <div class="actions">
        <select :value="task.priority"
                @change="$emit('change-priority', task.id, $event.target.value)">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <BaseButton variant="success" @click="$emit('complete', task.id)">
          {{ task.completed ? 'Reopen' : 'Complete' }}
        </BaseButton>
        <BaseButton @click="editing = true">Edit</BaseButton>
        <BaseButton variant="danger" @click="$emit('delete', task.id)">Delete</BaseButton>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>
.title { margin-right: 8px; }
.strike { text-decoration: line-through; color: #888; }
.badge { padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: 500; }
.low { background: #e3f4e8; color: #137a3f; }
.medium { background: #fff2d6; color: #8a5a00; }
.high { background: #fde4e4; color: #c62828; }
.desc { margin: 0 0 6px; }
.meta { margin: 0 0 12px; color: #666; font-size: 13px; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
select { padding: 6px; border: 1px solid #c9ccd3; border-radius: 6px; font: inherit; }
.done { opacity: 0.75; }
</style>
