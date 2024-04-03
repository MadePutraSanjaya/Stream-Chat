import React from 'react'
import Sidebar from "../components/Sidebar";
import ChatPage from './chat/page';
import Button from '@/components/Button/Button';

const Page = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className="mb-1 text-6xl font-extrabold text-blue-500">Stream Chat</h1>
      <p className="mb-10">The coolest chat app. Try Now!</p>
      <Button>Start Your Own Chatting</Button>
    </div>
  )
}

export default Page