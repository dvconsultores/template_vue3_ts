<template>
  <Navbar title="navbar" />

  <div id="home" class="fill-height flex-center">
    <v-responsive class="align-center text-center pb-4">
      <v-img height="100" :src="logo" />

      <div class="text-body-1 font-weight-light mb-n1">Welcome to</div>
      <h1 class="text-h1 font-weight-bold">Vuetify</h1>
      <h2 v-font="[16, 3.5]" class="py-5">{{name}}</h2>

      <v-btn
        class="btn bg-primary text-white"
        rounded @click="anything"
      >Do Anything!</v-btn>
    </v-responsive>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/home.scss'
import logo from '@/assets/sources/logos/logo.svg'
import variables from '@/mixins/variables';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import ToastTitle from '@/components/toast-content/toast-title.vue';
const
  { isLogged } = variables,
  toast = useToast(),

name = ref("detextre4")


onMounted(() => {
  console.log(isLogged() ? 'logged in - ' : '', `welcome back ${name.value}`);
})


function anything() {
  toast.success({
    component: ToastTitle,
    props: {
      title: "Do anything",
      desc: "powered by detextre4"
    }
  })
}
</script>
