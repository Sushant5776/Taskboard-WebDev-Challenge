import { User } from 'firebase/auth'

export interface UserImageDetails {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface UserListItem {
  uid: string
  username: string
  lists:
    | {
        name: string
        items: { name: string; completed: boolean; description: string }[]
      }[]
    | []
}

export interface UserState {
  user: User | null
}

export interface UserAction {
  type: 'getIn' | 'getOut'
  payload: User | null
}
