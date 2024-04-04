import React from 'react'
import {Channel, Window, MessageList, MessageInput, ChannelHeader, Thread, LoadingIndicator, ChannelList} from "stream-chat-react"

interface ChatChannelProps {
    show: boolean;
}

const ChatChannel: React.FC<ChatChannelProps> = ({show}) => {
  return (
    <div className={`h-full w-full ${show? "block" : "hidden"}`}>
    <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
    </Channel>
      </div>
  )
}

export default ChatChannel