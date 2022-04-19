import { Item } from '@/types/interfaces'
import {
  DotsVerticalIcon,
  PencilIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AddItemPopup from '@/components/AddItemPopup'
import ItemComponent from '@/components/ItemComponent'
import EditListPopup from '../EditListPopup'
import { TrashIcon } from '@heroicons/react/outline'

const ListComponent = ({ name, docId }: { name: string; docId: string }) => {
  const {
    query: { userId },
  } = useRouter()
  const [items, setItems] = useState<Item[] | []>([])
  const [addItemPopupState, setAddItemPopupState] = useState(false)
  const [editListPopupState, setEditListPopupState] = useState(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users', userId as string, 'lists', docId, 'items'),
      (snapshot) => {
        setItems(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().toDateString(),
              } as Item)
          )
        )
      }
    )
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="h-max min-w-[20%] max-w-sm rounded-lg border-2 border-neutral-200 p-4">
      {addItemPopupState ? (
        <AddItemPopup
          list={{ name: name, id: docId }}
          closer={setAddItemPopupState}
        />
      ) : (
        ''
      )}
      {editListPopupState ? (
        <EditListPopup
          listName={name}
          listId={docId}
          closer={setEditListPopupState}
        />
      ) : (
        ''
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2 divide-x-2 divide-neutral-200">
          <div title={`Delete ${name}`}>
            <TrashIcon
              onClick={() =>
                deleteDoc(
                  doc(db, 'users', userId as string, 'lists', docId)
                ).catch((err) => alert(err.message))
              }
              className="h-6 w-6 cursor-pointer text-red-400 hover:text-red-500 active:scale-95"
            />
          </div>
          <h1 className="block pl-2 text-lg font-medium text-emerald-700">
            {name}
          </h1>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setAddItemPopupState(true)}
            title="Add New Item"
            className="h-max w-max rounded-full hover:shadow-md"
          >
            <PlusCircleIcon className="h-8 w-8 fill-neutral-500 transition hover:fill-indigo-600 active:scale-95" />
          </button>
          {/* edit */}
          <button
            title="Edit List"
            onClick={() => setEditListPopupState(true)}
            className="h-max w-max rounded-full"
          >
            <DotsVerticalIcon className="h-6 w-6 fill-neutral-500 transition hover:fill-indigo-600 active:scale-95" />
          </button>
        </div>
      </div>
      <hr className="my-2 rounded-lg border border-neutral-200" />
      <div className="space-y-3">
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} listId={docId} />
        ))}
      </div>
    </div>
  )
}

export default ListComponent
