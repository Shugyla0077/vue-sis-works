<script>
import { dashboardApi } from '../api'

export default {
  name: 'StudentsView',
  data() {
    return {
      students: [],
      loading: false,
      error: null,
      search: '',
      columns: [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'City', key: 'city' },
        { title: 'Department', key: 'department' }
      ]
    }
  },
  computed: {
    filteredStudents() {
      const q = this.search.trim().toLowerCase()
      if (!q) return this.students
      return this.students.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      )
    }
  },
  created() {
    this.fetchStudents()
  },
  methods: {
    async fetchStudents() {
      this.loading = true
      this.error = null
      try {
        const res = await dashboardApi.getStudents()
        this.students = res.data
      } catch (err) {
        this.error = err.message || 'Failed to load students list'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div>
    <a-page-header
      title="Students Directory"
      sub-title="Classmates & study group contacts"
      style="padding: 0 0 16px 0"
    />

    <a-input-search
      v-model:value="search"
      placeholder="Search student by name or email..."
      style="max-width: 360px; margin-bottom: 16px"
      allow-clear
    />

    <!-- ERROR STATE -->
    <a-alert
      v-if="error"
      type="error"
      show-icon
      message="Error fetching students"
      :description="error"
      style="margin-bottom: 16px"
    >
      <template #action>
        <a-button size="small" danger @click="fetchStudents">Retry</a-button>
      </template>
    </a-alert>

    <!-- ANT DESIGN TABLE WITH LOADING STATE -->
    <a-table
      :columns="columns"
      :data-source="filteredStudents"
      :loading="loading"
      row-key="id"
      :pagination="{ pageSize: 5 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'city'">
          {{ record.address?.city }}
        </template>
        <template v-else-if="column.key === 'department'">
          <a-tag color="geekblue">{{ record.company?.name }}</a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>