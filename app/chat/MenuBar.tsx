import { UserButton } from '@clerk/nextjs'
import { Users } from 'lucide-react'
import React from 'react'

const MenuBar = () => {
  return (
    <div className="p-3 flex item-center justify-between gap-3 bg-white border-e border-e-[#DBDDE1]">
      <UserButton afterSignOutUrl='/' />
      <div className="flex gap-6">
        <span title="Show users">
            <Users className='cursor-pointer' />
        </span>
      </div>
    </div>
  )
}

export default MenuBar