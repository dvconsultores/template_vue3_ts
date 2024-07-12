<template>
  <v-dialog
    v-model="model"
    :max-width="maxWidth"
    :activator="activator"
    :content-class="['custom-modal', contentClass]"
    :persistent="persistent"
    :fullscreen="fullscreen"
  >
    <v-card :loading="loading">
      <v-btn size="25" variant="text" class="close-button text-foreground ml-auto" @click="model = false">
        <v-icon icon="mdi-close" size="16" />
      </v-btn>

      <v-card-title :class="[titleClass, titleCenter ? 'text-center' : '' ]">
        <slot name="title">{{ title }}</slot>
      </v-card-title>

      <v-divider v-if="showDivider"></v-divider>

      <v-card-text :class="['pt-0 pb-4', textClass, contentCenter ? 'text-center' : '' ]">
        <slot>
          <p v-html="content" class="mb-0" />
        </slot>
      </v-card-text>

      <v-card-actions v-if="!hideActions" :class="{ actionsClass }">
        <v-btn
          class="bg-tertiary text-white flex-grow-1"
          @click="hasCancelEmit ? emit('cancel', modelParameter) : model = false"
        >{{ cancelButtonText }}</v-btn>

        <v-btn
          class="bg-primary text-white flex-grow-1"
          :disabled="disabled || loading"
          @click="emit('confirm', modelParameter)"
        >{{ confirmButtonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue'

defineProps({
  fullscreen: Boolean,
  activator: String,
  persistent: Boolean,
  title: String,
  contentCenter: Boolean,
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
  emit = defineEmits(['open', 'confirm', 'close', 'cancel']),
  instance = getCurrentInstance(),

model = ref(false),
modelParameter = ref(null),
hasCancelEmit = !!instance?.vnode.props?.onCancel

function showModal(parameter) {
  modelParameter.value = parameter
  model.value = true
}

defineExpose({ model, showModal })


watch(model, (value) => {
  if (value) emit('open', modelParameter.value)
  else emit('close', modelParameter.value)
})
</script>

<style lang="scss">
.custom-modal {
  > .v-card {
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 3px;
    right: 3px;
  }
}
</style>
