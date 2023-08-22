import { vue3Debounce } from 'vue-debounce'

// Types
import type { App } from 'vue'

export default (app: App) => app
  .directive('debounce', vue3Debounce({
    lock: false,
    // listenTo: 'keyup',
    // defaultTime: '300ms',
    // fireOnEmpty: false,
    // trim: false
  }))
