<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listFiles, uploadFile, deleteFile, downloadFile } from '../services/fileApi'

const router = useRouter()
const files = ref([])
const uploading = ref(false)
const fileInput = ref(null)

async function loadFiles() {
  files.value = await listFiles()
}

function pickFile() {
  fileInput.value.click()
}

async function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  uploading.value = true
  try {
    const newFile = await uploadFile(file)
    files.value.unshift(newFile)
  } catch (err) {
    alert('上传失败')
  } finally {
    uploading.value = false
    e.target.value = ''
  }
}

async function handleDelete(id) {
  if (!confirm('确定删除这个文件？')) return
  await deleteFile(id)
  files.value = files.value.filter((f) => f.id !== id)
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

function handleDownload(file) {
  downloadFile(file.id, file.filename)
}

onMounted(loadFiles)
</script>

<template>
  <div class="page">
    <header class="topbar">
      <h1>我的文件</h1>
      <div>
        <button @click="pickFile" :disabled="uploading">
          {{ uploading ? '上传中...' : '+ 上传文件' }}
        </button>
        <button class="ghost" @click="router.push('/notes')">笔记</button>
      </div>
    </header>

    <input
      ref="fileInput"
      type="file"
      style="display: none"
      @change="onFileChange"
    />

    <p v-if="files.length === 0" class="empty">还没有文件，点「上传文件」添加</p>

    <ul v-else class="file-list">
      <li v-for="file in files" :key="file.id" class="file-item">
        <div class="file-info">
          <div class="file-name">{{ file.filename }}</div>
          <div class="file-meta">{{ formatSize(file.size) }}</div>
        </div>
        <div class="actions">
          <button class="down" @click="handleDownload(file)">下载</button>
          <button class="del" @click="handleDelete(file.id)">删除</button>
        </div>
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
.file-list {
  list-style: none;
  padding: 0;
}
.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
}
.file-name {
  font-weight: 500;
}
.file-meta {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}
button.del {
  background: transparent;
  color: #d9534f;
  border: 1px solid #d9534f;
}
.actions {
  display: flex;
  gap: 8px;
}
button.down {
  background: transparent;
  color: #4a90d9;
  border: 1px solid #4a90d9;
}
</style>