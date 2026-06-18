<template>
  <div class="container">
    <div class="title">🎁端午翻牌🎁</div>
    <div class="subtitle">输入你的ff14游戏id</div>
    
    <div class="input-section">
      <input 
        class="id-input" 
        type="text" 
        placeholder="输入游戏id" 
        v-model="userId"
        maxlength="20"
      />
    </div>
    
    <button class="start-btn" @click="startGame" :disabled="!userId.trim()">
      开始翻牌
    </button>
    
    <div class="rules">
      <div class="rules-title">游戏规则：</div>
      <div class="rules-item">1. 中奖概率倍儿高</div>
      <div class="rules-item">2. 奖品也嘛倍儿好</div>
      <div class="rules-item">3. 手机钞票奔驰金条还有大金劳儿</div>
      <div class="rules-item">4. 一人一次，按照名称发奖</div>
    </div>

    <div v-if="showAlert" class="custom-alert-overlay" @click="closeAlert">
      <div class="custom-alert" @click.stop>
        <div class="alert-header">{{ alertTitle }}</div>
        <div class="alert-body">{{ alertMessage }}</div>
        <button class="alert-btn" @click="closeAlert">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = ref('')
const showAlert = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')

const showCustomAlert = (title: string, message: string) => {
  alertTitle.value = title
  alertMessage.value = message
  showAlert.value = true
}

const closeAlert = () => {
  showAlert.value = false
}

const startGame = () => {
  if (!userId.value.trim()) {
    showCustomAlert('?', '没名字的禁止参加')
    return
  }

  if (userId.value.trim().length < 2) {
    showCustomAlert('?', '部队什么时候来的单字id玩家')
    return
  }

  router.push({
    path: '/lottery',
    query: { userId: encodeURIComponent(userId.value.trim()) }
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 16px;
  color: #fff;
  margin-bottom: 60px;
  opacity: 0.9;
}

.input-section {
  width: 100%;
  max-width: 400px;
  margin-bottom: 45px;
}

.id-input {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  border: none;
  outline: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.id-input::placeholder {
  color: #999;
}

.start-btn {
  width: 100%;
  max-width: 400px;
  height: 50px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #667eea;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 45px;
  transition: all 0.3s;
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.start-btn:disabled {
  background: #ccc;
  color: #999;
  cursor: not-allowed;
}

.rules {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  max-width: 400px;
}

.rules-title {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
}

.rules-item {
  font-size: 14px;
  color: #fff;
  line-height: 25px;
  opacity: 0.9;
}

.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.custom-alert {
  background: white;
  border-radius: 15px;
  padding: 0;
  max-width: 350px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

.alert-header {
  font-size: 18px;
  font-weight: bold;
  color: #667eea;
  padding: 20px 20px 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.alert-body {
  font-size: 16px;
  color: #333;
  padding: 20px;
  line-height: 1.5;
  text-align: center;
}

.alert-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0 0 15px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.alert-header {
  font-size: 18px;
  font-weight: bold;
  color: #667eea;
  padding: 20px 20px 10px;
  border-bottom: 1px solid #eee;
}

.alert-body {
  font-size: 16px;
  color: #333;
  padding: 20px;
  line-height: 1.5;
}

.alert-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0 0 15px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
}

.alert-btn:hover {
  opacity: 0.9;
}
</style>
