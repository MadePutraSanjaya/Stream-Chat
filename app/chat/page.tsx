"use client";
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
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

  if (!chatClient || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
      <LoadingIndicator size={40} />
      </div>
    )
  }

  const handleSidebarOnClose = () => {
    
  }

  return (
    <div className='h-screen'>
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
        <div className="flex flex-row h-full">
        <ChatSidebar user={user} show={isLargeScreen || chatSideOpen} onClose={handleSidebarOnClose} />
        <ChatChannel show={isLargeScreen || !chatSideOpen} hideChannelOnThread={!isLargeScreen} />
        </div>
      </Chat>
    </div>
  )
}

export default ChatPage