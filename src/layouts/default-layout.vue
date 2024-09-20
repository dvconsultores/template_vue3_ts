<template>
  <v-app id="layout">
    <v-main>
      <Drawer></Drawer>
      <router-view />
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script setup>
import '@/assets/styles/layouts/default-layout.scss'
import Drawer from '@/components/drawer.vue'
import Footer from '@/components/footer.vue'
</script>
