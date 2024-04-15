import React, { useEffect, useState } from 'react'
import { UserResource } from '@clerk/types';
import { useChatContext, Avatar, LoadingChannels as LoadingUser } from 'stream-chat-react'
import { Channel, UserResponse } from 'stream-chat';
import { ArrowLeft } from 'lucide-react';

interface UsersMenuProps {
    loggedInUser: UserResource
    onClose: () => void
    onChannelSelected: () => void
}

const UsersMenu: React.FC<UsersMenuProps> = ({ loggedInUser, onClose, onChannelSelected }) => {
    const { client, setActiveChannel } = useChatContext();
    const [users, setUsers] = useState<(UserResponse[] & { image?: string })>();

    useEffect(() => {
        async function loadInitialUsers() {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            try {
                const response = await client.queryUsers(
                    {
                        id: { $ne: loggedInUser.id }
                    },
                    { id: 1 }
                )
                setUsers(response.users || []);
            } catch (e) {
                console.error(e)
                alert("Error loading user")
            }
        }
        loadInitialUsers()
    }, [client, loggedInUser.id])

    function handleChannelSelected(channel: Channel) {
        setActiveChannel(channel);
        onChannelSelected();
    }

    async function startChatWithUser(userId: string) {
        try {
            const channel = client.channel("messaging", {
                members: [userId, loggedInUser.id]
            })

            await channel.create();
            handleChannelSelected(channel);
        } catch (error) {
            console.error(error)
            alert("Error creating channel")
        }
    }

    return (
        <div className='str-chat bg-white absolute z-10 h-full w-full border-e border-e-[#DBDDE1]'>
            <div className="flex items-center gap-3 p-3 text-lg font-bold">
                <ArrowLeft className='cursor-pointer' onClick={onClose} />
            </div>
            <div className="">
                {!users && <LoadingUser />}
                {users?.map((user) => (
                    <UserResult user={user} onUserClick={startChatWithUser} key={user.id} />
                ))}
            </div>
        </div>
    )
}

export default UsersMenu


interface UserResultProps {
    user: UserResponse & { image?: string }
    onUserClick: (userId: string) => void
}

export const UserResult: React.FC<UserResultProps> = ({ user, onUserClick }) => {
    return <button className='mb-3 w-full flex items-center p-2 gap-2 hover:bg-[#e9eaed]'
        onClick={() => onUserClick(user.id)}>

        <span>
            <Avatar image={user.image} name={user.name || user.id} size={40} />
        </span>
        <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
            {user.name || user.id}
        </span>
        {user.online && <span className='text-xs text-green-500'>Online</span>}
    </button>
}
