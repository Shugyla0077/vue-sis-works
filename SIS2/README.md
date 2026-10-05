# Task Manager (Vue 3 + Vite)

## Run
    npm install
    npm run dev

Features: add / view / edit / complete / delete tasks, change priority, search by title,
filter by priority and status, statistics, localStorage persistence.

Requirements coverage: props + custom events (TaskItem, TaskForm, TaskStats), methods,
computed (filteredTasks, counters), watcher (tasks -> localStorage), lifecycle hooks
(created, mounted), slots (BaseCard), global components (BaseCard, BaseButton in main.js).
