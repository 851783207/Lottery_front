<template>
  <div class="container">
    <NavigationBar title="幸运翻牌" :back="true" />
    
    <div class="content">
      <div class="header">
        <div class="user-id">玩家：{{ userId }}</div>
        <div class="tip" v-if="!flipped">点击卡片翻开您的幸运奖品</div>
      </div>

      <div class="grid-container">
        <div 
          v-for="(card, index) in cards" 
          :key="card.id"
          class="card"
          :class="{
            'flipping': flipped && index === selectedIndex,
            'opened': card.opened,
            'selected': index === selectedIndex,
            'clickable': !flipped && !card.opened
          }"
          @click="flipCard(index)"
        >
          <div class="card-front" v-if="!card.opened && !(flipped && index === selectedIndex)">
            <span class="card-number">{{ card.number }}</span>
          </div>
          <div class="card-back" v-if="card.opened || (flipped && index === selectedIndex)">
            <span class="prize-name">{{ card.prize }}</span>
          </div>
        </div>
      </div>

      <div class="result-section" v-if="flipped">
        <div class="congrats">🎉 恭喜您获得 🎉</div>
        <div class="your-prize">{{ selectedPrize }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import NavigationBar from '@/components/NavigationBar.vue'

const API_BASE_URL = '/api/lottery'

interface Card {
  id: number
  number: number
  prize: string
  opened: boolean
}

const route = useRoute()
const userId = ref(decodeURIComponent(route.query.userId as string || ''))
const flipped = ref(false)
const selectedIndex = ref(-1)
const selectedPrize = ref('')
const cards = ref<Card[]>([])

onMounted(() => {
  loadCardStatus()
})

const loadCardStatus = async () => {
  try {
    console.log('开始请求:', `${API_BASE_URL}/getCard`)
    const response = await axios.get(`${API_BASE_URL}/getCard`, {
      timeout: 10000
    })
    console.log('响应数据:', response.data)
    
    if (response.data && response.data.length > 0) {
      initCards(response.data)
    } else {
      useMockData()
    }
  } catch (error: any) {
    console.error('请求失败:', error)
    console.warn('使用模拟数据')
    useMockData()
  }
}

const useMockData = () => {
  const mockData = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: ['一等奖', '二等奖', '三等奖', '谢谢参与', '幸运奖', '参与奖', '特等奖', '优秀奖', '纪念奖'][i],
    status: '0'
  }))
  initCards(mockData)
}

const initCards = (cardStatusList: any[]) => {
  cards.value = cardStatusList.map((item) => ({
    id: item.id,
    number: item.id,
    prize: item.name,
    opened: item.status === '1'
  }))
}

const flipCard = (index: number) => {
  if (flipped.value) {
    alert('已经翻过牌了')
    return
  }

  const card = cards.value[index]

   if (!card) {
    return
  }
  
  if (card.opened) {
    alert('此卡片已被翻开')
    return
  }

  if (confirm(`确定要翻开第${card.number}号卡片吗？`)) {
    submitFlip(card.id, card.prize, index)
  }
}

const submitFlip = async (cardId: number, prize: string, index: number) => {
  try {
    const params = new URLSearchParams()
    params.append('name', userId.value)
    params.append('id', String(cardId))

    const response = await axios.post(`${API_BASE_URL}/lottery`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (response.data && response.data.code === 200) {
      const updatedCards = cards.value.map((card, i) => {
        if (i === index) {
          return { ...card, opened: true }
        }
        return card
      })

      cards.value = updatedCards
      flipped.value = true
      selectedIndex.value = index
      selectedPrize.value = prize

    } else {
      const errorMsg = response.data?.message || response.data?.msg || '翻牌失败'
      alert(errorMsg)
    }
  } catch (error) {
    console.error('请求失败', error)
    alert('网络请求失败，请重试')
  }
}
</script>


<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  overflow-x: hidden;
}

.content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 44px);
  justify-content: center;
}

.header {
  text-align: center;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.user-id {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 5px;
}

.tip {
  font-size: 13px;
  color: #fff;
  opacity: 0.9;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  justify-self: center;
  flex-shrink: 0;
}

.card {
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: default;
}

.card.clickable {
  cursor: pointer;
  transition: transform 0.3s;
}

.card.clickable:active {
  transform: scale(0.95);
}

.card.flipping {
  animation: flipAnimation 0.6s ease-in-out;
}

.card.opened {
  opacity: 0.6;
  background: linear-gradient(135deg, #ffeb3b 0%, #fff176 100%);
  box-shadow: 0 0 10px rgba(255, 235, 59, 0.6);
}

.card.selected {
  box-shadow: 0 0 20px rgba(255, 215, 0, 1);
  opacity: 1 !important;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
}

@keyframes flipAnimation {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-front {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.card-back {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.card-number {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.prize-name {
  font-size: 11px;
  color: #667eea;
  font-weight: bold;
  text-align: center;
  line-height: 1.4;
  padding: 5px;
  word-break: break-word;
}

.result-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 350px;
  margin: 20px auto 0;
  flex-shrink: 0;
}

.congrats {
  font-size: 16px;
  color: #667eea;
  font-weight: bold;
  margin-bottom: 10px;
}

.your-prize {
  font-size: 18px;
  color: #764ba2;
  font-weight: bold;
  line-height: 1.5;
}

/* 小屏幕适配 */
@media (max-width: 480px) {
  .content {
    padding: 10px;
  }

  .header {
    margin-bottom: 15px;
  }

  .user-id {
    font-size: 15px;
  }

  .tip {
    font-size: 12px;
  }

  .grid-container {
    gap: 10px;
    max-width: 340px;
  }

  .card {
    border-radius: 8px;
  }

  .card.opened {
    opacity: 0.65;
  }

  .card-number {
    font-size: 32px;
  }

  .prize-name {
    font-size: 10px;
  }

  .result-section {
    padding: 15px;
    margin-top: 15px;
  }

  .congrats {
    font-size: 15px;
  }

  .your-prize {
    font-size: 16px;
  }
}

/* 超小屏幕适配 */
@media (max-width: 360px) {
  .grid-container {
    gap: 8px;
    max-width: 300px;
  }

  .card-number {
    font-size: 28px;
  }

  .prize-name {
    font-size: 9px;
  }
}
</style>
