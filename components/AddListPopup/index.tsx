import { addListPopupStateAtom } from 'atoms/addListPopup'
import { useSetRecoilState } from 'recoil'
import { PlusCircleIcon, XIcon } from '@heroicons/react/solid'
import { Dispatch, MouseEvent, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useContextValue } from 'ContextProvider'
import { db } from 'firebaseApp'
import { UserAction, UserState } from '@/types/interfaces'

const AddListPopup = () => {
  const setAddListPopupState = useSetRecoilState(addListPopupStateAtom)
  const [user] = useContextValue() as [UserState, Dispatch<UserAction>]
  const [input, setInput] = useState('')

  const handlePropogation = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const createList = () => {
    addDoc(collection(db, 'users', user.user!.uid, 'lists'), {
      name: input,
      timestamp: serverTimestamp(),
    }).then(() => {
      setInput('')
      setAddListPopupState(false)
    })
  }

  const close = () => {
    setInput('')
    setAddListPopupState(false)
  }

  return (
    <div
      onClick={close}
      className="absolute top-0 left-0 z-50 h-screen w-full backdrop-blur-md hover:cursor-pointer"
    >
      <div
        onClick={(event) => handlePropogation(event)}
        className="absolute top-1/2 left-1/2 h-max w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-rose-100 to-indigo-100 p-4 hover:cursor-auto"
      >
        <div
          onClick={close}
          className="group float-right w-max cursor-pointer rounded-full p-1 hover:bg-white hover:shadow-md"
        >
          <XIcon className="h-6 w-6 fill-rose-400 active:scale-95 group-hover:fill-rose-500" />
        </div>
        <div className="clear-both space-y-4">
          <h1 className="text-center text-lg font-medium text-neutral-700">
            Create New List
          </h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="New List Name"
              className="focus:shadow-mg flex-1 rounded-lg bg-transparent bg-white p-2 text-neutral-700 focus:shadow-sm focus:outline-none"
            />
            <button className="group" disabled={!input} onClick={createList}>
              <PlusCircleIcon
                className={`h-11 w-11 fill-indigo-500 hover:fill-indigo-600 active:scale-95 group-disabled:scale-100 group-disabled:fill-gray-400`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddListPopup
