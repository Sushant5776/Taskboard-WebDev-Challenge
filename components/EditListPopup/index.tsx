import { RefreshIcon, XIcon } from '@heroicons/react/solid'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useRouter } from 'next/router'

const EditListPopup = ({
  listName,
  listId,
  closer,
}: {
  listName: string
  listId: string
  closer: Dispatch<SetStateAction<boolean>>
}) => {
  const {
    query: { userId },
  } = useRouter()
  const [input, setInput] = useState('')

  const handlePropogation = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const close = () => {
    setInput('')
    closer(false)
  }

  const updateList = (event: MouseEvent) => {
    event.preventDefault()
    updateDoc(doc(db, 'users', userId as string, 'lists', listId), {
      name: input,
    })
      .then(() => {
        close()
      })
      .catch((err) => alert(err.message))
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
          <h1 className="text-center text-xl font-medium text-neutral-600">
            Edit - {listName}
          </h1>
          <form className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="focus:shadow-mg flex-1 rounded-lg bg-transparent bg-white p-2 text-neutral-700 focus:shadow-sm focus:outline-none"
              placeholder={`Enter New Name for ${listName}`}
            />
            <button
              type="submit"
              title={`Update ${listName}`}
              className="group"
              disabled={!input}
              onClick={updateList}
            >
              <RefreshIcon
                className={`h-10 w-10 fill-indigo-500 hover:fill-indigo-600 active:scale-95 group-disabled:scale-100 group-disabled:fill-gray-400`}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditListPopup
