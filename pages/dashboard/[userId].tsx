import Header from '@/components/Header'
import { UserAction, List, UserState } from '@/types/interfaces'
import { useContextValue } from 'ContextProvider'
import { collection, onSnapshot, getDocs } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Dispatch, useEffect, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import AddListPopup from '@/components/AddListPopup'
import { useRecoilState } from 'recoil'
import { addListPopupStateAtom } from 'atoms/addListPopup'
import ListComponent from '@/components/ListComponent'
import { useRouter } from 'next/router'

const Dashboard = ({ data }: { data: List[] }) => {
  const {
    query: { userId },
  } = useRouter()
  const [lists, setLists] = useState(data)
  const [{ user }] = useContextValue() as [UserState, Dispatch<UserAction>]
  const [addListPopupState, setAddListPopupState] = useRecoilState(
    addListPopupStateAtom
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users', userId as string, 'lists'),
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as List)
        )
        console.log(data[0])
        setLists(data)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="min-h-screen">
      {addListPopupState ? <AddListPopup /> : ''}
      <Head>
        <title>Dashboard - {user?.displayName}</title>
      </Head>
      <Header />
      <h1 className="my-4 ml-4 text-2xl font-medium text-neutral-600">
        Your Lists
      </h1>
      <div className="flex space-x-6 px-4">
        {lists.map(({ id, name }) => (
          <ListComponent key={id} name={name} docId={id} />
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
  let data: List[] = []
  if (userId) {
    data = (
      await getDocs(collection(db, 'users', userId as string, 'lists'))
    ).docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
      timestamp: doc.data().timestamp.toDate().toDateString() as string,
    }))
  }

  return {
    props: { data },
  }
}
