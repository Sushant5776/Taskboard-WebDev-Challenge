import Form from '@/components/AuthForm'
import Head from 'next/head'

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-green-50 to-green-100">
      <Head>
        <title>Task List - Sign Up</title>
      </Head>

      <Form type="signup" title="Sign Up" />
    </div>
  )
}

export default SignUp
