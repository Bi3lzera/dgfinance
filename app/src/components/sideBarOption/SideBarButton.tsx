import React from 'react'

interface SideBarButtonProps {
  icon: string
  label: string
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ icon, label }) => {
  return (
    <div className='flex flex-row gap-2 border border-blue-900 shadow-lg w-[8vw] min-w-26 h-10 rounded-md justify-center items-center bg-blue-400 hover:bg-blue-300 '>
      <img src={icon}></img>
      <p>{label}</p>
    </div>
  )
}

export default SideBarButton
