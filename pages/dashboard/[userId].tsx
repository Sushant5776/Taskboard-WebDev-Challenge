import Header from '@/components/Header'
import { UserAction, UserListItem, UserState } from '@/types/interfaces'
import { useContextValue } from 'ContextProvider'
import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Dispatch, useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import AddListPopup from '@/components/AddListPopup'
import { useRecoilState } from 'recoil'
import { addListPopupStateAtom } from 'atoms/addListPopup'

const Dashboard = ({ data }: { data: UserListItem | undefined }) => {
  const [lists, setLists] = useState(data?.lists ?? [])
  const [{ user }] = useContextValue() as [UserState, Dispatch<UserAction>]
  const [addListPopupState, setAddListPopupState] = useRecoilState(
    addListPopupStateAtom
  )

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <div className="min-h-screen">
      {addListPopupState ? <AddListPopup /> : ''}
      <Head>
        <title>Dashboard - {user?.displayName}</title>
      </Head>
      <Header />
      <div>
        {lists.map((list, index) => (
          <div key={index}>
            <h1>{list.name}</h1>
            {list.items.length > 0 ? (
              list.items.map((item, index) => (
                <div key={index}>
                  <h1>
                    {item.name} - {item.completed ? 'done' : 'do it'}
                  </h1>
                </div>
              ))
            ) : (
              <p>No Items In List</p>
            )}
          </div>
        ))}
      </div>

      <div
        onClick={() => setAddListPopupState(true)}
        className="absolute right-6 bottom-6 cursor-pointer rounded-full hover:shadow-md"
      >
        <PlusCircleIcon className="h-16 w-16 fill-blue-500 hover:fill-blue-600 active:scale-95" />
      </div>
    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query
  const data = (
    await getDoc(doc(collection(db, 'users'), userId as string))
  ).data() as UserListItem | undefined

  return {
    props: { data: data ?? [] },
  }
}
