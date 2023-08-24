<template>
  <div id="home" class="fill-height flex-center">
    <v-responsive class="align-center text-center pb-4">
      <v-img height="100" src="@/assets/sources/logos/logo.svg" />

      <div class="text-body-1 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h1 font-weight-bold">Vuetify</h1>

      <h2 v-font="[16, 3.5]" class="py-5">{{name}}</h2>

      <v-btn
        class="bg-primary text-white"
        rounded @click="console.log('do anything!')"
      >Do Anything!</v-btn>
    </v-responsive>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/home.scss'
import variables from '@/mixins/variables';
import { ref, onMounted } from 'vue';
const
  { isLogged } = variables


const
  name = ref("detextre4")

onMounted(() => {
  console.log(isLogged() ? 'logged in - ' : '', `welcome back ${name.value}`);
})
</script>
