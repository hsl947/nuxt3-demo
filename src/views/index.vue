<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import {login} from "@/api/user.js";
const router = useRouter()

login({a:1, b:2, c:3, d:4})
</script>

<template>
  <div class="index-container">
    <div class="login-box">
      Demo
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
