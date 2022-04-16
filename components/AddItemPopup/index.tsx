import { useSetRecoilState } from 'recoil'
import { PlusCircleIcon, XIcon } from '@heroicons/react/solid'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
// import { useContextValue } from 'ContextProvider'
// import { db } from 'firebaseApp'
// import { UserAction, UserState } from '@/types/interfaces'
import { addItemPopupStateAtom } from 'atoms/addItemPopup'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useRouter } from 'next/router'
import { Item } from '@/types/interfaces'

const AddItemPopup = ({
  list,
  closer,
}: {
  list: { name: string; id: string }
  closer: Dispatch<SetStateAction<boolean>>
}) => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [complete, setComplete] = useState(false)
  const {
    query: { userId },
  } = useRouter()

  const handlePropogation = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const close = () => {
    setName('')
    setDesc('')
    setComplete(false)
    closer(false)
  }

  const createItem = (event: MouseEvent) => {
    event.preventDefault()
    addDoc(
      collection(db, 'users', userId as string, 'lists', list.id, 'items'),
      {
        name: name,
        completeStatus: complete,
        description: desc,
        timestamp: serverTimestamp(),
      }
    )
      .then(() => {
        setName('')
        setDesc('')
        setComplete(false)
        closer(false)
      })
      .catch((error) => alert(error.message))
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
        <div className="clear-both space-y-3">
          <h1 className="text-center text-xl font-medium text-neutral-600">
            Add New Item - {list.name}
          </h1>
          <form className="space-y-3">
            <div className="space-y-1">
              <label className="text-neutral-700" htmlFor="name">
                Name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg py-2 px-4 text-neutral-600 focus:shadow-sm focus:outline-none"
                type="text"
                id="name"
                placeholder="Enter Item Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-neutral-700" htmlFor="desc">
                Description
              </label>
              <textarea
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
                className="w-full resize-y rounded-lg py-2 px-4 text-neutral-600 focus:outline-none"
                id="desc"
                placeholder="Enter Item Name"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={complete}
                onChange={() => setComplete((prevState) => !prevState)}
                className="h-4 w-4"
                id="complete"
              />
              <label htmlFor="complete" className="text-neutral-700">
                Complete
              </label>
            </div>
            <button
              onClick={(event) => createItem(event)}
              type="submit"
              className="block w-full rounded-lg bg-blue-400 p-2 font-medium text-white transition hover:bg-blue-500 active:scale-95"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItemPopup
