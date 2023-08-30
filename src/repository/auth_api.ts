import axios from "axios"
import { useToast } from "vue-toastification"
import router from "@/router"
import { useStorage } from "vue3-storage-secure"

class AuthApi {
  private static _toast = useToast()
  private static _storage = useStorage()

  
  static async signIn(fields: { email: string, password: string }): Promise<void> {
    try {
      const data: string = await new Promise((resolve) => {
        setTimeout(() => resolve("authorizationToken"), 2000);
      }) // <-- fake fetch
      // const { data } = await axios.post('signin/', fields)

      this._storage?.setStorageSync('tokenAuth', data)
    } catch (error: any) {
      throw this._toast.error(error.toString())
    }
  }

  static logOut() {
    router.push('/auth')
  }
}

export default AuthApi