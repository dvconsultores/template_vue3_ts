<template>
  <v-app id="auth-layout">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import '@/assets/styles/layouts/auth-layout.scss'
import { createApp } from 'vue'

createApp({
  name: "AuthLayout",
})
</script>
