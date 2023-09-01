<template>
  <v-dialog
    v-model="model"
    max-width="350"
    :activator="activator"
    :content-class="contentClass"
    :persistent="persistent"
  >
    <v-card :loading="loading">
      <v-card-title :class="{'text-center': titleCenter}">
        <slot name="title">{{ title }}</slot>
      </v-card-title>

      <v-divider v-if="showDivider"></v-divider>

      <v-card-text>
        <slot name="content">
          <p>{{ content }}</p>
        </slot>
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="bg-primary text-white flex-grow-1"
          :disabled="disabled || loading"
          @click="emit('onAccept')"
        >{{ confirmButtonText }}</v-btn>

        <v-btn
          class="bg-tertiary text-white flex-grow-1"
          @click="() => {
            emit('onCancel')
            model = false
          }"
        >{{ cancelButtonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps({
    activator: String,
    persistent: Boolean,
    title: String,
    content: String,
    confirmButtonText: {
      type: String,
      default: 'Aceptar'
    },
    cancelButtonText: {
      tyoe: String,
      default: 'Cancelar'
    },
    contentClass: String,
    loading: Boolean,
    disabled: Boolean,
    showDivider: Boolean,
    titleCenter: Boolean,
  })

const
  emit = defineEmits(['onAccept', 'onClose', 'onCancel']),

  model = ref(false)

defineExpose({ model })


watch(model, (value) => {
  if (!value) emit('onClose')
})
</script>
