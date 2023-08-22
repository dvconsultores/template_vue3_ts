<template>
  <v-app id="layout">
    <v-main>
      <drawer></drawer>

      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import '@/assets/styles/layouts/default-layout.scss'
import { createApp } from 'vue'
import drawer from '@/components/drawer.vue'

createApp({
  name: "DefaultLayout",
  components: { drawer }
})
</script>
