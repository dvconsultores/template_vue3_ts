<template>
  <v-dialog
    v-model="model"
    :max-width="maxWidth"
    :activator="activator"
    :content-class="contentClass"
    :persistent="persistent"
    :fullscreen="fullscreen"
  >
    <v-card :loading="loading">
      <v-card-title :class="[titleClass, titleCenter ? 'text-center' : '' ]">
        <slot name="title">{{ title }}</slot>
      </v-card-title>

      <v-divider v-if="showDivider"></v-divider>

      <v-card-text :class="textClass">
        <slot>
          <p v-html="content" />
        </slot>
      </v-card-text>

      <v-card-actions v-if="!hideActions" :class="{ actionsClass }">
        <v-btn
          class="bg-tertiary text-white flex-grow-1"
          @click="hasCancelEmit ? emit('cancel') : model = false"
        >{{ cancelButtonText }}</v-btn>

        <v-btn
          class="bg-primary text-white flex-grow-1"
          :disabled="disabled || loading"
          @click="emit('accept')"
        >{{ confirmButtonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'

defineProps({
  fullscreen: Boolean,
  activator: String,
  persistent: Boolean,
  title: String,
  content: String,
  confirmButtonText: {
    type: String,
    default: 'Aceptar'
  },
  cancelButtonText: {
    type: String,
    default: 'Cancelar'
  },
  contentClass: String,
  titleClass: String,
  textClass: String,
  actionsClass: String,
  loading: Boolean,
  disabled: Boolean,
  showDivider: Boolean,
  titleCenter: Boolean,
  maxWidth: {
    type: String,
    default: "350"
  },
  hideActions: Boolean,
})

const
  emit = defineEmits(['open', 'accept', 'close', 'cancel']),
  instance = getCurrentInstance(),

model = ref(false),
hasCancelEmit = !!instance?.vnode.props?.onCancel

defineExpose({ model })


watch(model, (value) => {
  if (value) emit('open')
  else emit('close')
})
</script>
