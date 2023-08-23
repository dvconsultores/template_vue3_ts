<template>
  <v-img
    :src="src"
    :alt="alt"
    :aspect-ratio="aspectRatio"
    :content-class="contentClass"
    :cover="cover"
    :eager="eager"
    :gradient="gradient"
    :height="height"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :min-height="minHeight"
    :min-width="minWidth"
    :sizes="sizes"
    :width="width"
    :options="options"
    :transition="transition"
    :inline="inline"
    :lazy-src="lazySrc"
    class="v-img-load"
    :style="`--border-radius: ${rounded}; --border: ${border}`"
  >
    <template v-if="!lazySrc" #placeholder>
      <v-skeleton-loader
        :boilerplate="stopLoading"
        :color="colorLoader"
        type="avatar"
        width="100%"
        height="100%"
      ></v-skeleton-loader>
    </template>
  </v-img>
</template>

<script setup>
defineProps({
  src: String,
  alt: String,
  aspectRatio: Number,
  contentClass: String,
  cover: Boolean,
  eager: String,
  gradient: String,
  height: String,
  maxHeight: String,
  maxWidth: String,
  minHeight: String,
  minWidth: String,
  sizes: String,
  width: String,
  options: Object,
  transition: String,
  inline: Boolean,
  lazySrc: String,
  stopLoading: Boolean,
  rounded: String,
  border: String,
  colorLoader: String,
})
</script>

<style scoped lang="scss">
.v-img-load {
  .v-img__placeholder .v-skeleton-loader{
    border-radius: 50%;

    &__bone {
      $size: 100%;
      min-width: $size;
      min-height: $size;
      margin: 0;
    }
  }
}
</style>
