import React from 'react'

interface SideBarButtonProps {
  icon: string
  label: string
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ icon, label }) => {
  return (
    <div className='flex flex-col border border-blue-400 shadow-lg w-[8vw] min-w-24 h-17 rounded-md justify-center items-center hover:bg-blue-300'>
      <img src={icon}></img>
      <p>{label}</p>
    </div>
  )
}

export default SideBarButton
