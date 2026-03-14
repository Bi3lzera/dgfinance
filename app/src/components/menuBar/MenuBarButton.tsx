import React from 'react'
import { IconType } from 'react-icons'

interface SideBarButtonProps {
  icon?: string
  iconComponent?: IconType
  label: string
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ icon, label }) => {
  return (
    <div className='flex flex-row gap-2 w-[12vw] h-[5vh] rounded-md justify-left items-center hover:bg-blue-300 pl-2'>
      <img className='w-6 h-6' src={icon}></img>
      <p>{label}</p>
    </div>
  )
}

export default SideBarButton
