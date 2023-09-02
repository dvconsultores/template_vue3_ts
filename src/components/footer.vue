<template>
  <v-footer id="footer" app absolute class="flex-center">
    <h6>footer</h6>
  </v-footer>
</template>

<style scoped lang="scss">
@import '@/assets/styles/config/variables.scss';
@import '@/assets/styles/config/custom-mixins.scss';

#footer {
  transition: 0.5s $ease-return;
  @include parent;
  padding-inline: var(--margin-global);
}
</style>
