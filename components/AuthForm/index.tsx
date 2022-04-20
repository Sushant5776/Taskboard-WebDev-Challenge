import { UserAction, UserState } from '@/types/interfaces'
import { signUpStateAtom } from 'atoms/signUpAtom'
import { useContextValue } from 'ContextProvider'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth, db } from 'firebaseApp'
import Link from 'next/link'
import { Dispatch, MouseEvent } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { doc, setDoc } from 'firebase/firestore'
import nprogress from 'nprogress'

const Form = ({ title, type }: { title: string; type: string }) => {
  const router = useRouter()
  const [_state, dispatch] = useContextValue() as [
    UserState,
    Dispatch<UserAction>
  ]
  const [form, setForm] = useRecoilState(signUpStateAtom)
  const resetForm = useResetRecoilState(signUpStateAtom)

  const handleSignUp = (event: MouseEvent) => {
    event.preventDefault()

    if (form.termsAndCondition) {
      createUserWithEmailAndPassword(auth, form.email, form.password).then(
        (value) => {
          updateProfile(value.user, { displayName: form.username }).then(() => {
            setDoc(doc(db, 'users', value.user.uid), {
              username: value.user.displayName,
            })
              .then(() => {
                if (dispatch) {
                  dispatch({ type: 'getIn', payload: value.user })
                  // clear inputs after signing up
                  resetForm()
                  nprogress.start()
                  router
                    .push(`/dashboard/${auth.currentUser?.uid}`)
                    .then(() => nprogress.done())
                }
              })
              .catch((error) => alert(error.message))
          })
        }
      )
    } else {
      alert(
        'You need to accept Terms and Conditions to continue using the platform!'
      )
    }
  }

  const handleLogin = (event: MouseEvent) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((value) => {
        if (dispatch) {
          dispatch({ type: 'getIn', payload: value.user })
          resetForm()
        }
      })
      .catch((error) => alert(error.message))
  }

  return (
    <main className="absolute top-1/2 left-1/2 h-max w-[25%] -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-gradient-to-r from-teal-100 to-lime-100 p-4 shadow-lg">
      <h1 className="text-center text-3xl font-semibold text-neutral-500">
        {title}!
      </h1>
      <form className="space-y-4 sm:space-y-2">
        {type === 'signup' ? (
          <div className="w-full space-y-1">
            <label htmlFor="username" className="w-full text-neutral-700">
              Username
            </label>
            <input
              value={form.username}
              onChange={(event) =>
                setForm((prevState) => ({
                  ...prevState,
                  username: event.target.value,
                }))
              }
              className="w-full rounded-lg p-2 text-neutral-600 focus:shadow-sm focus:outline-none"
              type="text"
              id="username"
              placeholder="Enter Your Username"
            />
          </div>
        ) : (
          ''
        )}
        <div className="w-full space-y-1">
          <label htmlFor="email" className="w-full text-neutral-700">
            Email
          </label>
          <input
            value={form.email}
            onChange={(event) =>
              setForm((prevState) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
            className="w-full rounded-lg p-2 text-neutral-600 focus:shadow-sm focus:outline-none"
            type="email"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="w-full space-y-1">
          <label htmlFor="password" className="w-full text-neutral-700">
            Password
          </label>
          <input
            value={form.password}
            onChange={(event) =>
              setForm((prevState) => ({
                ...prevState,
                password: event.target.value,
              }))
            }
            className="w-full rounded-lg p-2 text-neutral-600 focus:shadow-sm focus:outline-none"
            type="password"
            id="password"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="w-full">
          {type === 'signin' ? (
            <a
              className="float-right text-neutral-700 hover:text-neutral-800"
              href="#"
            >
              Forgot Password?
            </a>
          ) : (
            <div className="flex items-center space-x-2 py-2">
              <input
                type="checkbox"
                id="check"
                className="h-4 w-4"
                checked={form.termsAndCondition}
                onChange={() =>
                  setForm((prevState) => ({
                    ...prevState,
                    termsAndCondition: !prevState.termsAndCondition,
                  }))
                }
              />
              <label
                htmlFor="check"
                className="text-neutral-700 hover:text-neutral-800"
              >
                I accept the Terms & Conditions
              </label>
            </div>
          )}
        </div>
        {type === 'signin' ? (
          <button
            type="submit"
            onClick={(event) => handleLogin(event)}
            className="w-full rounded-lg bg-lime-200 p-2 text-lg font-semibold text-neutral-600 transition hover:bg-lime-500 hover:text-white active:scale-95 active:text-lime-200"
          >
            Log In
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSignUp}
            className="w-full rounded-lg bg-lime-200 p-2 text-lg font-semibold text-neutral-600 transition hover:bg-lime-500 hover:text-white active:scale-95 active:text-lime-200"
          >
            Sign Up
          </button>
        )}
      </form>
      {type === 'signin' ? (
        <>
          <hr className="mx-auto w-1/2 bg-slate-300" />
          <Link href="/signup">
            <a className="mx-auto inline-block w-full cursor-pointer rounded-lg bg-lime-200 p-2 text-center text-lg font-semibold text-neutral-600 transition hover:bg-lime-500 hover:text-white">
              Sign Up
            </a>
          </Link>
        </>
      ) : (
        <>
          <hr className="mx-auto w-1/2 bg-slate-300" />
          <Link href="/">
            <a className="mx-auto inline-block w-full cursor-pointer rounded-lg bg-lime-200 p-2 text-center text-lg font-semibold text-neutral-600 transition hover:bg-lime-500 hover:text-white">
              Log In
            </a>
          </Link>
        </>
      )}
    </main>
  )
}

export default Form
