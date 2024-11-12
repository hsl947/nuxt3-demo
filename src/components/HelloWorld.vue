<script setup>
import useUserStore from '@/stores/modules/user'
import { getCurrentInstance, onMounted, ref } from 'vue'
const { proxy } = getCurrentInstance()

const value = ref('')
</script>

<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<style lang="scss" scoped>

</style>
