/// <reference types="vite/client" />

import Loader from '@/components/modals/loader.vue'
import ModalConfirm from '@/components/modals/modal-confirm.vue'
import VImgLoad from '@/components/v-img-load.vue'
import VImgInput from '@/components/v-img-input.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Loader: typeof Loader,
    ModalConfirm: typeof ModalConfirm,
    VImgLoad: typeof VImgLoad,
    VImgInput: typeof VImgInput,
  }
}

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
