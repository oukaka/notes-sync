<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '../services/authApi'

const router = useRouter()

const email = ref('')
const password = ref('')
const isRegister = ref(false)
const errorMsg = ref('')
const loading = ref(false)

async function handleSubmit() {
  errorMsg.value = ''

  if (!email.value || !password.value) {
    errorMsg.value = '邮箱和密码不能为空'
    return
  }

  loading.value = true
  try {
    if (isRegister.value) {
      await register(email.value, password.value)
      errorMsg.value = ''
      isRegister.value = false
      alert('注册成功，请登录')
    } else {
      const data = await login(email.value, password.value)
      localStorage.setItem('token', data.token)
      router.push('/notes')
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.message || '操作失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrap">
    <div class="login-box">
      <h1>{{ isRegister ? '注册' : '登录' }}</h1>

      <input v-model="email" type="email" placeholder="邮箱" />
      <input v-model="password" type="password" placeholder="密码" />

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <button :disabled="loading" @click="handleSubmit">
        {{ loading ? '处理中...' : isRegister ? '注册' : '登录' }}
      </button>

      <p class="switch" @click="isRegister = !isRegister">
        {{ isRegister ? '已有账号？去登录' : '没有账号？去注册' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.login-box {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #4a90d9;
  color: white;
  cursor: pointer;
}
button:disabled {
  background: #aaa;
}
.error {
  color: #d9534f;
  margin: 0;
  font-size: 14px;
}
.switch {
  text-align: center;
  color: #4a90d9;
  cursor: pointer;
  font-size: 14px;
  margin: 0;
}
</style>