<script>
export default {
  name: 'App',
  computed: {
    selectedKeys() {
      return [this.$route.path]
    }
  },
  methods: {
    onMenuClick({ key }) {
      this.$router.push(key)
    }
  }
}
</script>

<template>
  <a-layout style="min-height: 100vh">
    <!-- Sidebar Navigation -->
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <div class="logo">🎓 KBTU Portal</div>
      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="selectedKeys"
        @click="onMenuClick"
      >
        <a-menu-item key="/">📊 Overview</a-menu-item>
        <a-menu-item key="/assignments">📝 Assignments</a-menu-item>
        <a-menu-item key="/courses">📚 Courses</a-menu-item>
        <a-menu-item key="/students">👥 Students Directory</a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- Main Layout -->
    <a-layout>
      <a-layout-header class="header">
        <h2 style="margin: 0; font-size: 18px">Student Dashboard — SIS 4</h2>
        <div class="student-badge">
          <a-tag color="blue">GPA: 3.75</a-tag>
          <a-avatar style="background-color: #1677ff">S</a-avatar>
          <span>Student KBTU</span>
        </div>
      </a-layout-header>

      <a-layout-content style="margin: 24px 16px 0">
        <div class="content-box">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 48px;
  margin: 16px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
}
.header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.student-badge {
  display: flex;
  align-items: center;
  gap: 10px;
}
.content-box {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  min-height: 80vh;
}
</style>