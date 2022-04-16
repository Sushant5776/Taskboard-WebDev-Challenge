import { Item } from '@/types/interfaces'
import {
  CheckCircleIcon,
  DotsVerticalIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid'
// import { ExclamationCircleIcon } from '@heroicons/react/outline'

const ItemComponent = ({
  item: { completeStatus, name, description, id, timestamp },
}: {
  item: Item
}) => {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border-2 ${
        completeStatus ? 'border-green-200' : 'border-slate-200'
      } p-2`}
    >
      {/* Wrapper for first two elements because of flex container */}
      <div className="flex flex-1 items-center space-x-2">
        {/* complete icon */}
        {completeStatus ? (
          <CheckCircleIcon className="h-6 w-6 rounded-full fill-emerald-500 shadow-md" />
        ) : (
          <ExclamationCircleIcon className="h-6 w-6 rounded-full fill-slate-500 shadow-md" />
        )}
        {/* name and description */}
        <div>
          <p>{name}</p>
          {/* <p className="text-slate-400">{description}</p> */}
        </div>
      </div>
      {/* edit */}
      <DotsVerticalIcon className="h-5 w-5 cursor-pointer fill-neutral-500 hover:fill-neutral-600 active:scale-90" />
    </div>
  )
}

export default ItemComponent
