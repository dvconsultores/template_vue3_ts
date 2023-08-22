<template>
  <section id="login">
    <img src="@/assets/sources/logos/logo.svg" style="width: min(450px, 100%)">

    <v-form ref="form">
      <v-text-field
        v-model="dataLogin.email"
        variant="solo"
        placeholder="Correo electronico"
        append-inner-icon="mdi-email"
        :rules="globalRules.email"
        @keydown="e => e.key === 'Enter' ? $refs.password.focus() : null"
      ></v-text-field>

      <v-text-field
        ref="password"
        v-model="dataLogin.password" solo
        variant="solo"
        placeholder="Contraseña"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="rules.password"
        @click:appendInner="showPassword = !showPassword"
        @keydown="e => e.key === 'Enter' ? handleLogin() : null"
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

<script lang="ts">
import '@/assets/styles/pages/login.scss'
import { ref } from 'vue'
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "LoginPage",
  layout: "auth-layout",
  setup() {
    return {
      isLoading: ref(false),
      rememberMe: ref(false),
      showPassword: ref(false),
      dataLogin: ref({
        email: undefined,
        password: undefined,
      }),
      rules: {
        password: [
          (v: string) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%&*-]).{6,}$/.test(v)
            || 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial',
        ]
      },
    }
  },
  created() {
    const storage = this.$storage

    if (storage.getStorageSync("tokenAuth"))
      storage.removeStorageSync("tokenAuth")

    const rmEmail = storage.getStorageSync('rmEmail')
    if (rmEmail) {
      this.dataLogin.email = rmEmail
      this.rememberMe = true
    }
  },
  methods: {
    async handleLogin() {
      const validate = await this.$refs.form.validate()
      if (!validate.valid) return

      this.isLoading = true

      const data = await new Promise((resolve) => {
        setTimeout(() => resolve("authorizationToken"), 2000);
      })

      if (!this.rememberMe) this.$storage.removeStorageSync('rmEmail')
      else this.$storage.setStorageSync('rmEmail', this.dataLogin.email)

      this.$storage.setStorageSync('tokenAuth', data)

      toast.success('Sign in successful!')
      this.$router.push('/')
    },
    handleRegister() {
      this.$router.push('/register')
    },
  }
}
</script>
