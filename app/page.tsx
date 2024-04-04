import React from 'react'
import Button from '@/components/Button/Button';
import Link from 'next/link';

const Page = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className="mb-1 text-6xl font-extrabold text-blue-500">Stream Chat</h1>
      <p className="mb-10">The coolest chat app. Try it Now!</p>
      <Button as={Link} href="/chat">Start Your Own Chatting</Button>
    </div>
  )
}

export default Page