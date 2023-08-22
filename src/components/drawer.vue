<template>
  <v-navigation-drawer
    id="drawer"
    v-model="store.state.drawer"
    :permanent="!isMobile"
    class="py-8 px-2"
  >
    <v-list nav>
      <div v-if="isMobile" class="flex-jstart" style="gap: 10px">
        <v-btn icon elevation="0" size="30">
          <v-icon size="20">mdi-cog-outline</v-icon>
        </v-btn>

        <v-btn icon elevation="0" size="30">
          <v-icon size="20">mdi-bell-outline</v-icon>
        </v-btn>
      </div>


      <div class="flex-acenter my-3 text-white" style="gap: 10px">
        <v-avatar image="@/assets/sources/images/avatar.png" alt="avatar" />

        <h6 class="mb-0">¡Hola detextre4!</h6>
      </div>

      <v-list-item
        v-for="(item, i) in data" :key="i"
        :title="item.name"
        @click="item.to ? $router.push(item.to) : null"
        class="text-white"
      >
        <template #prepend>
          <v-icon size="20" :icon="item.icon" />
        </template>
      </v-list-item>
    </v-list>

    <v-divider thickness="2" class="text-white mx-3 mb-4" />

    <v-list nav>
      <v-btn
        block
        class="bg-primary w500"
        @click="logOut()"
      >Cerrar sesión</v-btn>

      <div class="flex-center">
        <img
          src="@/assets/sources/logos/logo.svg"
          alt="logo"
          class="mt-6"
          style="width: min(130px, 100%)"
        >
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { createApp } from 'vue'
import { useRouter, RouteLocationRaw } from 'vue-router'
import { useStore } from 'vuex'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const router = useRouter()
const isMobile = useDisplay().mobile

const store = useStore()

createApp({
  name: "DrawerComponent",
})

const data: {icon: string, name: string, to: RouteLocationRaw | null}[] = [
  {
    icon: "mdi-currency-usd",
    name: "Mi perfil",
    to: "/profile"
  },
  {
    icon: "mdi-home-outline",
    name: "Dashboard",
    to: "/"
  },
  {
    icon: "mdi-file-document-outline",
    name: "Mis casos",
    to: null
  },
]


function logOut() {
  router.push('/login')
}
</script>

<style lang="scss">
#drawer {
  background-image: linear-gradient(#0b3f6b, #2a8ada);

  .v-list-item {
    &-title {
      font-size: 15px;
    }
  }
}
</style>
