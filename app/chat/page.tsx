"use client";
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useCallback, useEffect, useState } from 'react'
import {Chat, LoadingIndicator} from "stream-chat-react"
import useInitializeChatClient from './useInitializeChatClient';
import ChatSidebar from './ChatSidebar';
import ChatChannel from './ChatChannel';
import { Menu, X } from 'lucide-react';
import useWindowSize from '@/hooks/useWindowSize';
import { mdBreakpoint } from '@/utils/tailwind';

const ChatPage = () => {
  const chatClient = useInitializeChatClient();
  const {user} = useUser();
  const [chatSideOpen, setChatSideOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setChatSideOpen(false)
  }, [windowSize.width])

  const handleSidebarOnClose = useCallback(() => {
    setChatSideOpen(false)
  }, []) 

  if (!chatClient || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
      <LoadingIndicator size={40} />
      </div>
    )
  }


  return (
    <div className='h-screen bg-gray-100 xl:px-20 xl:py-8'>
      <div className='max-w-[1600px] min-w-[350px] h-full shadow-sm m-auto flex-col'>
      <Chat client={chatClient}>
        <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
          <button onClick={() => setChatSideOpen(!chatSideOpen)}>
            {!chatSideOpen ? (
              <span className='flex items-center gap-1'>
                <Menu /> Menu
              </span>
            ): (
              <X />
            )}
          </button>
        </div>
        <div className="flex flex-row overflow-y-auto h-full">
        <ChatSidebar user={user} show={isLargeScreen || chatSideOpen} onClose={handleSidebarOnClose} />
        <ChatChannel show={isLargeScreen || !chatSideOpen} hideChannelOnThread={!isLargeScreen} />
        </div>
      </Chat>
    </div>
    </div>
  )
}

export default ChatPage