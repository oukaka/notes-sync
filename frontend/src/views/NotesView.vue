<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listNotes, createNote, deleteNote } from '../services/noteApi'

const router = useRouter()
const notes = ref([])
const loading = ref(false)

async function loadNotes() {
  loading.value = true
  try {
    notes.value = await listNotes()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function handleCreate() {
  const note = await createNote({ title: '无标题', content: '' })
  notes.value.unshift(note)
}

async function handleDelete(id) {
  if (!confirm('确定删除这篇笔记？')) return
  await deleteNote(id)
  notes.value = notes.value.filter((n) => n.id !== id)
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(loadNotes)
</script>

<template>
  <div class="page">
    <header class="topbar">
      <h1>我的笔记</h1>
      <div>
        <button @click="handleCreate">+ 新建</button>
        <button class="ghost" @click="logout">退出</button>
        <button class="ghost" @click="router.push('/files')">文件</button>
      </div>
    </header>

    <p v-if="loading">加载中...</p>
    <p v-else-if="notes.length === 0" class="empty">还没有笔记，点「新建」开始</p>

    <ul v-else class="note-list">
      <li v-for="note in notes" :key="note.id" class="note-item">
        <div class="note-info" @click="router.push(`/notes/${note.id}`)">
          <div class="note-title">{{ note.title || '无标题' }}</div>
          <div class="note-date">{{ new Date(note.updatedAt).toLocaleString() }}</div>
        </div>
        <button class="del" @click="handleDelete(note.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
button {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  background: #4a90d9;
  color: white;
  cursor: pointer;
  margin-left: 8px;
}
button.ghost {
  background: transparent;
  color: #666;
  border: 1px solid #ccc;
}
.empty {
  color: #999;
  text-align: center;
  margin-top: 60px;
}
.note-info {
  cursor: pointer;
  flex: 1;
}
.note-list {
  list-style: none;
  padding: 0;
}
.note-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
}
.note-title {
  font-weight: 500;
}
.note-date {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}
button.del {
  background: transparent;
  color: #d9534f;
  border: 1px solid #d9534f;
}
</style>