import { User } from 'firebase/auth'
import { atom } from 'recoil'

export const userStateAtom = atom<User | null>({
  key: 'userState',
  default: null,
})
