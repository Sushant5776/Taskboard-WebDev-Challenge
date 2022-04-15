import { addListPopupStateAtom } from 'atoms/addListPopup'
import { useSetRecoilState } from 'recoil'
import { PlusCircleIcon, XIcon } from '@heroicons/react/solid'
import { MouseEvent } from 'react'

const AddListPopup = () => {
  const setAddListPopupState = useSetRecoilState(addListPopupStateAtom)

  const handlePropogation = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div
      onClick={() => setAddListPopupState(false)}
      className="absolute top-0 left-0 z-50 h-screen w-full backdrop-blur-md hover:cursor-pointer"
    >
      <div
        onClick={(event) => handlePropogation(event)}
        className="absolute top-1/2 left-1/2 h-max w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-rose-100 to-indigo-100 p-4 hover:cursor-auto"
      >
        <div
          onClick={() => setAddListPopupState(false)}
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
              placeholder="New List Name"
              className="focus:shadow-mg flex-1 rounded-lg bg-transparent bg-white p-2 text-neutral-700 focus:shadow-sm focus:outline-none"
            />
            <button>
              <PlusCircleIcon className="h-11 w-11 fill-indigo-500 hover:fill-indigo-600 active:scale-95" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddListPopup
