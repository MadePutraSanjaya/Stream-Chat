import React, { useCallback, useEffect, useState } from 'react'
import MenuBar from './MenuBar'
import { ChannelList, ChannelPreviewMessenger, ChannelPreviewUIComponentProps,  } from 'stream-chat-react'
import {UserResource} from "@clerk/types"
import UsersMenu from './UsersMenu';

interface ChatSidebarProps {
    user: UserResource;
    show: boolean;
    onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({user, show, onClose}) => {
  const [usersMenuOpen, setUsetsMenuOpen] = useState(false)

  useEffect(() => {
    if (!show) setUsetsMenuOpen(false)
  }, [show])


  const ChannelPreviewCustom = useCallback((props: ChannelPreviewUIComponentProps) => {
    return (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    );
  }, [onClose]);
  


  return (
    <div className={`relative w-full flex-col md:max-w-[360px] ${show ? "flex" : "hidden"}`}>
      {usersMenuOpen &&
        <UsersMenu loggedInUser={user} onClose={() => setUsetsMenuOpen(false)} onChannelSelected={() => {
          setUsetsMenuOpen(false);
          onClose();
        }} />
      }
       <MenuBar onUserMenuClick={() => setUsetsMenuOpen(true)} />
        <ChannelList 
        filters={{
          type: "messaging",
          members: { $in: [user.id]}
        }}
        sort={{last_message_at: -1}} 
        options={{state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
            searchForChannels: true,
            searchQueryParams: {
                channelFilters: {
                    filters : {members: { $in : [user?.id]}}
                }
            }
        }}
          Preview={ChannelPreviewCustom}
        />
    </div>
  )
}

export default ChatSidebar