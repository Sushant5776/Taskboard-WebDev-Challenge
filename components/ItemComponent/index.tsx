import { Item } from '@/types/interfaces'
import {
  CheckCircleIcon,
  DotsVerticalIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import EditItemPopup from '@/components/EditItemPopup'
import { deleteDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { db } from 'firebaseApp'

const ItemComponent = ({
  item: { completeStatus, name, description, id },
  listId,
}: {
  item: Item
  listId: string
}) => {
  const [editItem, setEditItem] = useState(false)
  const {
    query: { userId },
  } = useRouter()

  return (
    <div
      className={`space-y-2 divide-gray-200 rounded-lg border-2 p-2 ${
        completeStatus
          ? 'border-green-500 border-opacity-40'
          : 'border-slate-200'
      }`}
    >
      {editItem ? (
        <EditItemPopup
          closer={setEditItem}
          completeStatus={completeStatus}
          itemId={id}
          itemName={name}
          listId={listId}
          description={description}
        />
      ) : (
        ''
      )}
      <div className="flex items-center justify-between">
        {/* Wrapper for first two elements because of flex container */}
        <div className="flex flex-1 items-center space-x-2">
          {/* complete icon */}
          {completeStatus ? (
            <CheckCircleIcon className="h-6 w-6 rounded-full fill-emerald-500 shadow-md" />
          ) : (
            <ExclamationCircleIcon className="h-6 w-6 rounded-full fill-slate-500 shadow-md" />
          )}
          {/* name */}
          <div className="flex-1">
            <p>{name}</p>
          </div>
        </div>
        {/* edit */}
        <div className="flex items-center space-x-2 divide-neutral-200">
          <div title={`Delete ${name}`}>
            <TrashIcon
              onClick={() =>
                deleteDoc(
                  doc(
                    db,
                    'users',
                    userId as string,
                    'lists',
                    listId,
                    'items',
                    id
                  )
                )
              }
              className="h-5 w-5 cursor-pointer text-red-400 hover:text-red-500 active:scale-95"
            />
          </div>
          <div title={`Edit ${name}`}>
            <DotsVerticalIcon
              onClick={() => setEditItem(true)}
              className="h-5 w-5 cursor-pointer fill-neutral-500 hover:fill-neutral-600 active:scale-95"
            />
          </div>
        </div>
      </div>
      <hr className="border border-neutral-200" />
      {/* Description */}
      <p className="text-gray-500">{description}</p>
    </div>
  )
}

export default ItemComponent
