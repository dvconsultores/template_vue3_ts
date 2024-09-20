<template>
  <section id="login">
    <img src="@/assets/sources/logos/logo.svg" class="w-100">

    <v-form v-model="validForm" class="w-100">
      <v-text-field
        v-model="dataLogin.email"
        variant="solo"
        placeholder="Correo electronico"
        append-inner-icon="mdi-email"
        :rules="[globalRules.email]"
        @keydown="(e: any) => {
          if (e.key !== 'Enter') return
          passwordInput?.focus()
        }"
      ></v-text-field>

      <v-text-field
        ref="passwordInput"
        v-model="dataLogin.password" solo
        variant="solo"
        placeholder="Contraseña"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[globalRules.password]"
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
        class="btn my-2 bg-primary"
        :disabled="!validForm"
        :loading="isLoading"
        @click="handleLogin()"
      >Iniciar Sesión</v-btn>
      
      <v-btn
        class="btn bg-secondary"
        @click="handleRegister()"
      >Registrarse</v-btn>
    </v-form>
  </section>
</template>

<script setup lang="ts">
import '@/assets/styles/pages/login.scss'
import variables from '@/mixins/variables';
import { storageSecureCollection } from '@/plugins/vue3-storage-secure';
import AuthApi from '@/repository/auth_api';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useStorage } from 'vue3-storage-secure';
const
  toast = useToast(),
  storage = useStorage(),
  router = useRouter(),
  { globalRules } = variables,

validForm = ref(false),
isLoading = ref(false),
rememberMe = ref(false),
showPassword = ref(false),
dataLogin = ref({
  email: '',
  password: '',
}),
passwordInput: Ref<HTMLElement|null> = ref(null)


onBeforeMount(() => {
  if (storage?.getSecureStorageSync(storageSecureCollection.tokenAuth))
    storage.removeStorageSync(storageSecureCollection.tokenAuth)

  const rmEmail = storage?.getSecureStorageSync(storageSecureCollection.rememberEmail)
  if (rmEmail) {
    dataLogin.value.email = rmEmail
    rememberMe.value = true
  }
})


async function handleLogin() {
  if (isLoading.value || !validForm.value) return
  isLoading.value = true

  try {
    await AuthApi.signIn(dataLogin.value)

    if (!rememberMe.value) storage?.removeStorageSync(storageSecureCollection.rememberEmail)
    else storage?.setSecureStorageSync(storageSecureCollection.rememberEmail, dataLogin.value.email)

    toast.success('Sign in successful!')
    router.push({ name: 'Home' })
  } catch (error) {
    isLoading.value = false
    toast.error(error as string)
  }
}

function handleRegister() {
  router.push({ name: 'Register' })
}
</script>
