<script>
// Used for both adding and editing a task.
export default {
  name: 'TaskForm',
  props: {
    task: { type: Object, default: null }, // if passed -> edit mode
    submitLabel: { type: String, default: 'Add task' }
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      title: this.task ? this.task.title : '',
      description: this.task ? this.task.description : '',
      priority: this.task ? this.task.priority : 'medium'
    }
  },
  methods: {
    onSubmit() {
      if (!this.title.trim()) return
      this.$emit('submit', {
        title: this.title.trim(),
        description: this.description.trim(),
        priority: this.priority
      })
      if (!this.task) { this.title = ''; this.description = ''; this.priority = 'medium' }
    }
  }
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <input v-model="title" placeholder="Task title" required />
    <textarea v-model="description" rows="2" placeholder="Description"></textarea>
    <div class="row">
      <select v-model="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <BaseButton variant="primary" type="submit">{{ submitLabel }}</BaseButton>
      <BaseButton v-if="task" type="button" @click="$emit('cancel')">Cancel</BaseButton>
    </div>
  </form>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: 8px; }
.row { display: flex; gap: 8px; }
input, textarea, select { padding: 8px; border: 1px solid #c9ccd3; border-radius: 6px; font: inherit; }
</style>
