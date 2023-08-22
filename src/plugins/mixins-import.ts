import computeds from "@/mixins/computeds"

// Types
import type { App } from 'vue'

export default (app: App) => {
  // // Make sure to pick a unique name for the flag
  // // so it won't conflict with any other mixin.
  // if (!app.computeds) {
  //   app.computeds = true

     // Set up your mixin then
    app
      .mixin(computeds)
  // }
}
