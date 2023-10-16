import axios from "axios"
import router from "@/router"
import { useStorage } from "vue3-storage-secure"
import { storageSecureCollection } from "@/plugins/vue3-storage-secure"

class AuthApi {
  static async signIn(fields: { email: string, password: string }): Promise<void> {
    try {
      const data: string = await new Promise((resolve) => {
        setTimeout(() => resolve("authorizationToken"), 2000);
      }) // <-- fake fetch
      // const { data } = await axios.post('signin/', fields)

      useStorage()?.setSecureStorageSync(storageSecureCollection.tokenAuth, data)
    } catch (error: any) {
      throw error.response.data.toString()
    }
  }

  static logOut() {
    router.push({ name: 'Login' })
  }
}

export default AuthApi