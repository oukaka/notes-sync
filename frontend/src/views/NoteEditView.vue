<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNote, updateNote } from '../services/noteApi'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')
const saveStatus = ref('')
let timer = null

async function load() {
  const note = await getNote(route.params.id)
  title.value = note.title
  content.value = note.content || ''
}

async function save() {
  saveStatus.value = '保存中...'
  try {
    await updateNote(route.params.id, {
      title: title.value,
      content: content.value,
    })
    saveStatus.value = '已保存'
  } catch (err) {
    saveStatus.value = '保存失败'
  }
}

function scheduleSave() {
  saveStatus.value = '编辑中...'
  clearTimeout(timer)
  timer = setTimeout(save, 1000)
}

watch([title, content], scheduleSave)

onMounted(load)
</script>

<template>
  <div class="editor">
    <header class="bar">
      <button class="back" @click="router.push('/notes')">← 返回</button>
      <span class="status">{{ saveStatus }}</span>
    </header>

    <input v-model="title" class="title-input" placeholder="标题" />
    <textarea v-model="content" class="content-input" placeholder="开始写点什么..."></textarea>
  </div>
</template>

<style scoped>
.editor {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.back {
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}
.status {
  font-size: 13px;
  color: #999;
}
.title-input {
  width: 100%;
  font-size: 22px;
  font-weight: 500;
  border: none;
  outline: none;
  padding: 8px 0;
  margin-bottom: 12px;
  box-sizing: border-box;
}
.content-input {
  width: 100%;
  min-height: 400px;
  border: none;
  outline: none;
  resize: vertical;
  font-size: 16px;
  line-height: 1.6;
  box-sizing: border-box;
}
</style>