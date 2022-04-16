import { User } from 'firebase/auth'

export interface UserImageDetails {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface List {
  id: string
  name: string
  timestamp: string
}

export interface Item {
  id: string
  name: string
  description: string
  completeStatus: boolean
  timestamp: string
}

export interface UserState {
  user: User | null
}

export interface UserAction {
  type: 'getIn' | 'getOut'
  payload: User | null
}
