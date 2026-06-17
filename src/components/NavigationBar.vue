<template>
  <div class="navigation-bar">
    <div class="nav-inner">
      <div class="nav-left">
        <slot name="left">
          <div v-if="back" @click="handleBack" class="nav-btn back-btn">
            <div class="back-icon"></div>
          </div>
        </slot>
      </div>
      
      <div class="nav-center">
        <span v-if="title">{{ title }}</span>
        <slot v-else name="center"></slot>
      </div>
      
      <div class="nav-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title?: string
  back?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  back: false
})

const router = useRouter()

const handleBack = () => {
  router.back()
}
</script>

<style scoped>
.navigation-bar {
  --nav-height: 44px;
  --safe-top: env(safe-area-inset-top, 0px);
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: #fff;
}

.nav-inner {
  position: relative;
  height: calc(var(--nav-height) + var(--safe-top));
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--safe-top);
  width: 100%;
}

.nav-left {
  position: absolute;
  left: 16px;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-btn {
  padding: 11px 18px 11px 16px;
  margin: -11px -18px -11px -16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.nav-btn:hover {
  opacity: 0.7;
}

.back-icon {
  width: 12px;
  height: 24px;
  background-color: #fff;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='24' viewBox='0 0 12 24'%3E%3Cpath fill-opacity='.9' fill-rule='evenodd' d='M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5 10 4.563 2.682 12 10 19.438z'/%3E%3C/svg%3E") no-repeat 50% 50%;
  mask-size: cover;
}

.nav-center {
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.nav-right {
  position: absolute;
  right: 16px;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
