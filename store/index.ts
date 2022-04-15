import { UserAction, UserState } from '@/types/interfaces'
import { useReducer } from 'react'

let initialState: UserState = {
  user: null,
}

const reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'getIn':
      return {
        ...state,
        user: action.payload,
      } as UserState
    case 'getOut':
      return {
        ...state,
        user: null,
      } as UserState
    default:
      return state
  }
}

export const useStore = () => useReducer(reducer, initialState)
