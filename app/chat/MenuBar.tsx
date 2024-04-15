import { UserButton } from '@clerk/nextjs'
import { Users } from 'lucide-react'
import React from 'react'

interface MenuBarProps {
  onUserMenuClick: () => void
}

const MenuBar: React.FC<MenuBarProps> = ({onUserMenuClick}) => {
  return (
    <div className="p-3 flex item-center justify-between gap-3 bg-white border-e border-e-[#DBDDE1]">
      <UserButton afterSignOutUrl='/' />
      <div className="flex gap-6">
        <span title="Show users">
            <Users className='cursor-pointer' onClick={onUserMenuClick} />
        </span>
      </div>
    </div>
  )
}

export default MenuBar