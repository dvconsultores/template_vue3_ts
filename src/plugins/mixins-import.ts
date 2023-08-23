import variables from "@/mixins/variables"

// Types
import type { App } from 'vue'

export default (app: App) => {
  app
    .mixin(variables)
}
