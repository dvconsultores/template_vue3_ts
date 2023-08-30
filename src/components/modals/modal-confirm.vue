<template>
  <v-dialog v-model="dialog" max-width="350" :activator="activator" :content-class="contentClass" :persistent="persistent">
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
          class="bg-primary flex-grow-1"
          :disabled="disabled || loading"
          @click="emit('onAccept')"
        >{{ confirmButtonText }}</v-btn>

        <v-btn
          class="bg-tertiary flex-grow-1"
          @click="() => {
            emit('onCancel')
            dialog = false
          }"
        >{{ cancelButtonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const
  props = defineProps({
    model: Boolean,
    activator: String,
    persistent: Boolean,
    title: String,
    content: String,
    confirmButtonText: {
      tyoe: String,
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
  }),
  model = computed(() => props.model),
  emit = defineEmits(['onAccept', 'onClose', 'onCancel']),

dialog = ref(false)


watch(model, (val) => dialog.value = val)

watch(dialog, (val) => {
  if (val) return
  emit('onClose')
})
</script>
