"use client";
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import {Chat, LoadingIndicator} from "stream-chat-react"
import useInitializeChatClient from './useInitializeChatClient';
import ChatSidebar from './ChatSidebar';
import ChatChannel from './ChatChannel';
import { Menu, X } from 'lucide-react';

const ChatPage = () => {
  const chatClient = useInitializeChatClient()
  const {user} = useUser();
  const [chatSideOpen, setChatSideOpen] = useState(false)

  if (!chatClient || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
      <LoadingIndicator size={40} />
      </div>
    )
  }

  return (
    <div className='h-screen'>
      <Chat client={chatClient}>
        <div className="">
          <button>
            {!chatSideOpen ? (
              <span className='flex items-center gap-1'>
                <Menu /> Menu
              </span>
            ): (
              <X />
            )}
          </button>
        </div>
        <div className="flex flex-row h-full">
        <ChatSidebar user={user} show={chatSideOpen} />
        <ChatChannel show={!chatSideOpen} />
        </div>
      </Chat>
    </div>
  )
}

export default ChatPage