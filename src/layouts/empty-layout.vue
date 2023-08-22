<template>
  <v-app id="empty-layout">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { createApp } from 'vue'

createApp({
  name: "EmptyLayout",
})
</script>
