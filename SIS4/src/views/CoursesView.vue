<script>
import { dashboardApi } from '../api'

export default {
  name: 'CoursesView',
  data() {
    return {
      courses: [],
      loading: false,
      error: null,
      selectedCourse: null
    }
  },
  created() {
    this.fetchCourses()
  },
  methods: {
    async fetchCourses() {
      this.loading = true
      this.error = null
      try {
        const res = await dashboardApi.getCourses()
        const creditsList = [5, 6, 4, 5, 6, 3]
        this.courses = res.data.map((item, idx) => ({
          ...item,
          code: `CSCI-${2100 + idx}`,
          credits: creditsList[idx % creditsList.length]
        }))
      } catch (err) {
        this.error = err.message || 'Failed to load courses'
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
      title="Enrolled Courses"
      sub-title="Current semester syllabus & modules"
      style="padding: 0 0 16px 0"
    />

    <!-- LOADING STATE -->
    <div v-if="loading" style="text-align: center; padding: 60px 0">
      <a-spin size="large" tip="Loading courses..." />
    </div>

    <!-- ERROR STATE -->
    <a-alert
      v-else-if="error"
      type="error"
      show-icon
      message="Could not load courses"
      :description="error"
    >
      <template #action>
        <a-button size="small" danger @click="fetchCourses">Retry</a-button>
      </template>
    </a-alert>

    <!-- COURSES GRID -->
    <a-row v-else :gutter="[16, 16]">
      <a-col
        v-for="course in courses"
        :key="course.id"
        :xs="24"
        :sm="12"
        :lg="8"
      >
        <a-card :title="course.code" hoverable>
          <template #extra>
            <a-tag color="purple">{{ course.credits }} ECTS</a-tag>
          </template>
          <h4 style="text-transform: capitalize">{{ course.title }}</h4>
          <p style="color: #666">{{ course.body.slice(0, 90) }}...</p>
          <a-button type="link" style="padding: 0" @click="selectedCourse = course">
            View Syllabus →
          </a-button>
        </a-card>
      </a-col>
    </a-row>

    <!-- COURSE DETAILS MODAL -->
    <a-modal
      :open="Boolean(selectedCourse)"
      :title="selectedCourse ? `${selectedCourse.code} — Course Details` : ''"
      @ok="selectedCourse = null"
      @cancel="selectedCourse = null"
    >
      <template v-if="selectedCourse">
        <p><strong>Title:</strong> {{ selectedCourse.title }}</p>
        <p><strong>Credits:</strong> {{ selectedCourse.credits }} ECTS</p>
        <p><strong>Description:</strong> {{ selectedCourse.body }}</p>
      </template>
    </a-modal>
  </div>
</template>