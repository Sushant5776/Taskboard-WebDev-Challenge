import type { NextPage } from 'next'
import Head from 'next/head'
import Form from '@/components/AuthForm'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-green-50 to-green-100">
      <Head>
        <title>Task List - Log In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sign In */}
      <Form title="Log In" type="signin" />
    </div>
  )
}

export default Home
