import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'

// Types
import type { App } from 'vue'
import type { VueFireOptions } from 'vuefire'

export const firebaseApp = initializeApp({
  // project configuration
  apiKey: "AIzaSyAV8jmG0qmFlCO7lYoyaONHR9-Xnf9a1hA",
  authDomain: "apolotesnet.firebaseapp.com",
  projectId: "apolotesnet",
  storageBucket: "apolotesnet.appspot.com",
  messagingSenderId: "673175469064",
  appId: "1:673175469064:web:1c9c87db32853b12cfa5bd"
})

export const db = getFirestore(firebaseApp)

export default (app: App) => {
  const options: VueFireOptions = {
    firebaseApp,
    modules: [
      VueFireFirestoreOptionsAPI({
        // this would be the same behavior as VueFire v2
        reset: true,
        wait: false,
      }),
    ],
  };

  app.use(VueFire, options);
}
