<template>
  <nav id="navbar" class="flex-center">
    <h6>navbar</h6>
  </nav>
</template>

<style scoped lang="scss">
@import '@/assets/styles/config/variables.scss';
@import '@/assets/styles/config/custom-mixins.scss';

#navbar {
  animation: movedown .5s $ease-return;
  transition: 0.4s ease-in-out;
  @include parent;
  padding-inline: var(--margin-global);
  height: var(--h-navbar);
}
</style>
