import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// import "@/assets/styles/components/vue-toastification.scss";

// Types
import type { App } from 'vue'

export default (app: App) => {
  // documentation: https://github.com/Maronato/vue-toastification/tree/next

  const options = {
    // You can set your default options here
    position: POSITION.TOP_RIGHT
  };

  app.use(Toast, options);
}
