<script>
import { dashboardApi } from '../api'

export default {
  name: 'OverviewView',
  data() {
    return {
      assignments: [],
      courses: [],
      loading: false,
      error: null
    }
  },
  computed: {
    completedCount() {
      return this.assignments.filter(a => a.completed).length
    },
    pendingCount() {
      return this.assignments.length - this.completedCount
    },
    completionPercent() {
      if (!this.assignments.length) return 0
      return Math.round((this.completedCount / this.assignments.length) * 100)
    }
  },
  created() {
    this.fetchOverviewData()
  },
  methods: {
    async fetchOverviewData() {
      this.loading = true
      this.error = null
      try {
        const [todosRes, coursesRes] = await Promise.all([
          dashboardApi.getAssignments(),
          dashboardApi.getCourses()
        ])
        this.assignments = todosRes.data
        this.courses = coursesRes.data
      } catch (err) {
        this.error = err.message || 'Failed to load dashboard overview'
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
      title="Dashboard Overview"
      sub-title="Academic summary & progress"
      style="padding: 0 0 16px 0"
    />

    <!-- LOADING STATE -->
    <div v-if="loading" class="center-box">
      <a-spin size="large" tip="Loading student statistics..." />
    </div>

    <!-- ERROR STATE -->
    <a-alert
      v-else-if="error"
      type="error"
      show-icon
      message="Error loading dashboard"
      :description="error"
    >
      <template #action>
        <a-button size="small" danger @click="fetchOverviewData">Retry</a-button>
      </template>
    </a-alert>

    <!-- SUCCESS STATE -->
    <div v-else>
      <a-alert
        type="success"
        show-icon
        message="Data synchronized with REST API successfully"
        style="margin-bottom: 20px"
      />

      <!-- Statistics Cards -->
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :sm="8">
          <a-card>
            <a-statistic title="Active Courses" :value="courses.length" />
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="8">
          <a-card>
            <a-statistic
              title="Completed Assignments"
              :value="completedCount"
              :value-style="{ color: '#3f8600' }"
            />
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="8">
          <a-card>
            <a-statistic
              title="Pending Assignments"
              :value="pendingCount"
              :value-style="{ color: '#cf1322' }"
            />
          </a-card>
        </a-col>
      </a-row>

      <!-- Semester Progress -->
      <a-card title="Assignments Completion Progress" style="margin-top: 20px">
        <a-progress :percent="completionPercent" status="active" />
      </a-card>

      <!-- Recent Assignments List -->
      <a-card title="Recent Assignments" style="margin-top: 20px">
        <a-list :data-source="assignments.slice(0, 5)" bordered>
          <template #renderItem="{ item }">
            <a-list-item>
              <span>{{ item.title }}</span>
              <a-tag :color="item.completed ? 'green' : 'orange'">
                {{ item.completed ? 'Completed' : 'In Progress' }}
              </a-tag>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.center-box {
  text-align: center;
  padding: 60px 0;
}
</style>