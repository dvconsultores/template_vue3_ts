<template>
  <section id="login">
    <img src="@/assets/sources/logos/logo.svg" style="width: min(450px, 100%)">

    <v-form v-model="validForm">
      <v-text-field
        v-model="dataLogin.email"
        variant="solo"
        placeholder="Correo electronico"
        append-inner-icon="mdi-email"
        :rules="globalRules.email"
        @keydown="(e: any) => {
          if (e.key !== 'Enter') return
          elPassword?.focus()
        }"
      ></v-text-field>

      <v-text-field
        id="password"
        v-model="dataLogin.password" solo
        variant="solo"
        placeholder="Contraseña"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="rules.password"
        @click:appendInner="showPassword = !showPassword"
        @keydown="(e: any) => {
          if (e.key !== 'Enter') return
          handleLogin()
        }"
      ></v-text-field>

      <div class="flex-space-center">
        <v-checkbox
          v-model="rememberMe"
          label="Recuérdame"
          density="compact"
          hide-details
          color="rgb(var(--v-theme-primary))"
          class="flex-grow-0"
        ></v-checkbox>

        <a class="text-end">¿Olvidaste tu contraseña?</a>
      </div>

      <v-btn
        class="my-2 bg-primary"
        :disabled="isLoading"
        :loading="isLoading"
        @click="handleLogin()"
      >Iniciar Sesión</v-btn>
      
      <v-btn
        class="bg-secondary"
        @click="handleRegister()"
      >Registrarse</v-btn>
    </v-form>
  </section>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/login.scss'
import computeds from '@/mixins/computeds';
import { onMounted } from 'vue';
import { createApp, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useStorage } from 'vue3-storage-secure';
const toast = useToast();
const storage = useStorage()
const router = useRouter()

const { data } = computeds
const globalRules = data().globalRules

createApp({
  name: "LoginPage",
  layout: "auth-layout",
})

const
  validForm = ref(false),
  elPassword = ref<HTMLElement|null>(null),
  isLoading = ref(false),
  rememberMe = ref(false),
  showPassword = ref(false),
  dataLogin = ref({
    email: undefined,
    password: undefined,
  }),
  rules = {
    password: [
      (v: string) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%&*-]).{6,}$/.test(v)
        || 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial',
    ]
  };

onBeforeMount(() => {
  if (storage?.getStorageSync("tokenAuth"))
    storage.removeStorageSync("tokenAuth")

  const rmEmail = storage?.getStorageSync('rmEmail')
  if (rmEmail) {
    dataLogin.value.email = rmEmail
    rememberMe.value = true
  }
})

onMounted(() => {
  elPassword.value = document.getElementById('password')
})

async function handleLogin() {
    if (!validForm.value) return

    isLoading.value = true

    const data = await new Promise((resolve) => {
      setTimeout(() => resolve("authorizationToken"), 2000);
    })

    if (!rememberMe.value) storage?.removeStorageSync('rmEmail')
    else storage?.setStorageSync('rmEmail', dataLogin.value.email)

    storage?.setStorageSync('tokenAuth', data)

    toast.success('Sign in successful!')
    router.push('/')
  }

  function handleRegister() {
    router.push('/register')
  }
</script>
