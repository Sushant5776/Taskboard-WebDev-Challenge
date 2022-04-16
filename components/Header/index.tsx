import Image from 'next/image'
import { useEffect, useState } from 'react'
import { UserImageDetails } from '@/types/interfaces'
import { signOut } from 'firebase/auth'
import { auth } from 'firebaseApp'
import { useRouter } from 'next/router'

const Header = () => {
  const [userImage, setUserImage] = useState<null | UserImageDetails>(null)
  const [route, setRoute] = useState(false)
  const router = useRouter()

  const handleSignOut = () => {
    signOut(auth)
    setRoute(true)
  }

  useEffect(() => {
    if (route) {
      router.replace('/')
    }
  }, [route])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `https://picsum.photos/id/${Math.round(Math.random() * 1000)}/info`
      )
      const data: UserImageDetails = await res.json()
      setUserImage(data)
    }

    fetchUser()
  }, [])

  return (
    <div className="mx-auto flex items-center justify-between bg-gradient-to-r from-blue-200 to-indigo-200 px-4 py-2 shadow-md">
      <h1 className="text-2xl">TasksBoard</h1>
      <div
        onClick={handleSignOut}
        className="relative h-12 w-12 rounded-full shadow-md"
        title="Logout"
      >
        {userImage ? (
          <Image
            src={userImage?.download_url}
            layout="fill"
            className="cursor-pointer rounded-full"
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Header
