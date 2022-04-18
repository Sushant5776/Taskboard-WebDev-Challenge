import { UserAction, UserState } from '@/types/interfaces'
import { createContext, Dispatch, useContext } from 'react'

// This is the Data Layer
export const Context = createContext<[UserState, Dispatch<UserAction>] | []>([])

// This is how we use it inside of a component
export const useContextValue = () => useContext(Context)
