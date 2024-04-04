import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
        <SignIn appearance={{ variables : {colorPrimary: "#3b82f6"}}}  />
    </div>
  )
}
