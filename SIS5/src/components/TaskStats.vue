<script setup>
import { useTaskActions } from '../composables/useTaskActions'

const {
  totalCount,
  completedCount,
  pendingCount,
  highPriorityPendingCount,
  completionRate
} = useTaskActions()
</script>

<template>
  <div class="stats-container">
    <a-row :gutter="[16, 16]">
      <a-col :xs="12" :sm="6">
        <a-card size="small">
          <a-statistic title="Total Tasks" :value="totalCount" />
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="6">
        <a-card size="small">
          <a-statistic
            title="Completed"
            :value="completedCount"
            :value-style="{ color: '#3f8600' }"
          />
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="6">
        <a-card size="small">
          <a-statistic
            title="Pending"
            :value="pendingCount"
            :value-style="{ color: '#1677ff' }"
          />
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="6">
        <a-card size="small">
          <a-statistic
            title="High Priority"
            :value="highPriorityPendingCount"
            :value-style="{ color: '#cf1322' }"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-card size="small" style="margin-top: 16px">
      <div class="progress-header">
        <span>Overall Task Completion Progress</span>
        <strong>{{ completionRate }}%</strong>
      </div>
      <a-progress :percent="completionRate" :show-info="false" status="active" />
    </a-card>
  </div>
</template>

<style scoped>
.stats-container {
  margin-bottom: 20px;
}
.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
</style>
