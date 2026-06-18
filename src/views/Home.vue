<template>
  <div class="container">
    <div class="title">🎁 幸运翻牌 🎁</div>
    <div class="subtitle">请输入您的姓名开始游戏</div>
    
    <div class="input-section">
      <input 
        class="id-input" 
        type="text" 
        placeholder="请输入您的姓名" 
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = ref('')

const startGame = () => {
  if (!userId.value.trim()) {
    alert('请输入游戏id')
    return
  }

  if (userId.value.trim().length < 1) {
    alert('咱部队有单自id吗？')
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
</style>
