import { RefreshIcon, XIcon } from '@heroicons/react/solid'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useRouter } from 'next/router'

const EditItemPopup = ({
  itemName,
  itemId,
  completeStatus,
  description,
  listId,
  closer,
}: {
  itemName: string
  itemId: string
  listId: string
  description: string
  completeStatus: boolean
  closer: Dispatch<SetStateAction<boolean>>
}) => {
  const {
    query: { userId },
  } = useRouter()
  const [name, setName] = useState(itemName)
  const [desc, setDesc] = useState(description)
  const [complete, setComplete] = useState(completeStatus)

  const handlePropogation = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const close = () => {
    setName('')
    setDesc('')
    setComplete(false)
    closer(false)
  }

  const updateItem = (event: MouseEvent) => {
    event.preventDefault()
    updateDoc(
      doc(db, 'users', userId as string, 'lists', listId, 'items', itemId),
      {
        name: name,
        completeStatus: complete,
        description: desc,
      }
    )
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
            Edit - {itemName}
          </h1>
          <form className="flex w-full flex-col space-y-2">
            <div className="w-full space-y-1">
              <label htmlFor="name" className="cursor-pointer text-neutral-800">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="focus:shadow-mg w-full rounded-lg bg-transparent bg-white p-2 text-neutral-700 focus:shadow-sm focus:outline-none"
                placeholder={itemName}
              />
            </div>

            <div className="w-full space-y-1">
              <label htmlFor="desc" className="cursor-pointer text-neutral-800">
                Description
              </label>
              <textarea
                id="desc"
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
                className="focus:shadow-mg w-full rounded-lg bg-transparent bg-white p-2 text-neutral-700 focus:shadow-sm focus:outline-none"
                placeholder={description}
              />
            </div>
            <div className="flex w-full items-center space-x-2">
              <input
                checked={complete}
                onChange={() => setComplete((prevState) => !prevState)}
                type="checkbox"
                id="check"
                className="h-4 w-4"
              />
              <label
                htmlFor="check"
                className="cursor-pointer text-neutral-800"
              >
                Complete
              </label>
            </div>
            <button
              title={`Edit Item - ${itemName}`}
              onClick={(event) => updateItem(event)}
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

export default EditItemPopup
