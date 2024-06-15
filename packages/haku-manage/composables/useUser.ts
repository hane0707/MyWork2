import { type User } from "firebase/auth"
import { type Ref } from "vue"
 
export const useUser = () => {
  const user: Ref<User | null> = useState<User | null>('user')
 
  const updateUser = (user: Ref<User | null>) => (value: User | null) => {
    user.value = value
  }
 
  return {
    user: readonly(user),
    updateUser: updateUser(user)
  }
}