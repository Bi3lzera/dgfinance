import React from 'react'

interface SideBarButtonProps {
  icon?: string
  label: string
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ icon, label }) => {
  return (
    <div className='flex flex-row gap-2 w-[12vw] h-[5vh] rounded-md justify-left items-center hover:bg-gray-200 pl-2'>
      <img className='w-6 h-6' src={icon}></img>
      <p>{label}</p>
    </div>
  )
}

export default SideBarButton
