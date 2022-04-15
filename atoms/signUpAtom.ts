import { atom } from 'recoil'

export const signUpStateAtom = atom({
  key: 'Sign Up',
  default: {
    username: '',
    email: '',
    password: '',
    termsAndCondition: false,
  },
})
