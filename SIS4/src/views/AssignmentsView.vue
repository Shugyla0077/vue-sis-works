<script>
import { message } from 'ant-design-vue'
import { dashboardApi } from '../api'

export default {
  name: 'AssignmentsView',
  data() {
    return {
      assignments: [],
      loading: false,
      submitting: false,
      error: null,
      newTitle: '',
      statusFilter: 'all'
    }
  },
  computed: {
    filteredAssignments() {
      if (this.statusFilter === 'completed') {
        return this.assignments.filter(a => a.completed)
      }
      if (this.statusFilter === 'pending') {
        return this.assignments.filter(a => !a.completed)
      }
      return this.assignments
    }
  },
  created() {
    this.fetchAssignments()
  },
  methods: {
    async fetchAssignments() {
      this.loading = true
      this.error = null
      try {
        const res = await dashboardApi.getAssignments()
        this.assignments = res.data
      } catch (err) {
        this.error = err.message || 'Failed to fetch assignments'
      } finally {
        this.loading = false
      }
    },

    async addAssignment() {
      if (!this.newTitle.trim()) return
      this.submitting = true
      try {
        const payload = {
          title: this.newTitle.trim(),
          completed: false,
          userId: 1
        }
        const res = await dashboardApi.createAssignment(payload)
        this.assignments.unshift({ ...res.data, id: Date.now() })
        this.newTitle = ''
        message.success('Assignment added successfully!')
      } catch (err) {
        message.error('Failed to create assignment')
      } finally {
        this.submitting = false
      }
    },

    async toggleStatus(item) {
      const nextStatus = !item.completed
      try {
        await dashboardApi.toggleAssignment(item.id, nextStatus)
        item.completed = nextStatus
        message.success('Status updated!')
      } catch (err) {
        message.error('Failed to update status')
      }
    },

    async removeAssignment(id) {
      try {
        await dashboardApi.deleteAssignment(id)
        this.assignments = this.assignments.filter(a => a.id !== id)
        message.success('Assignment deleted')
      } catch (err) {
        message.error('Failed to delete assignment')
      }
    }
  }
}
</script>

<template>
  <div>
    <a-page-header
      title="My Assignments"
      sub-title="Manage homework & lab tasks via REST API"
      style="padding: 0 0 16px 0"
    />

    <!-- Add Form + Status Filter -->
    <a-card style="margin-bottom: 20px">
      <a-row :gutter="[12, 12]">
        <a-col :xs="24" :md="14">
          <a-input
            v-model:value="newTitle"
            placeholder="Enter new assignment title (e.g., Complete SIS 4)"
            @pressEnter="addAssignment"
          />
        </a-col>
        <a-col :xs="12" :md="5">
          <a-button
            type="primary"
            block
            :loading="submitting"
            @click="addAssignment"
          >
            Add Task
          </a-button>
        </a-col>
        <a-col :xs="12" :md="5">
          <a-select v-model:value="statusFilter" style="width: 100%">
            <a-select-option value="all">All Tasks</a-select-option>
            <a-select-option value="pending">Pending</a-select-option>
            <a-select-option value="completed">Completed</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-card>

    <!-- ERROR STATE -->
    <a-alert
      v-if="error"
      type="error"
      show-icon
      message="Failed to load assignments"
      :description="error"
      style="margin-bottom: 16px"
    >
      <template #action>
        <a-button size="small" danger @click="fetchAssignments">Retry</a-button>
      </template>
    </a-alert>

    <!-- LIST WITH LOADING STATE -->
    <a-list
      :loading="loading"
      :data-source="filteredAssignments"
      bordered
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-checkbox
            :checked="item.completed"
            @change="toggleStatus(item)"
          >
            <span :style="{ textDecoration: item.completed ? 'line-through' : 'none' }">
              {{ item.title }}
            </span>
          </a-checkbox>

          <template #actions>
            <a-tag :color="item.completed ? 'success' : 'processing'">
              {{ item.completed ? 'Done' : 'Pending' }}
            </a-tag>
            <a-button
              danger
              size="small"
              @click="removeAssignment(item.id)"
            >
              Delete
            </a-button>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>