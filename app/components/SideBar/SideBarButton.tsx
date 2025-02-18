import React from 'react'

interface SideBarButtonProps {
  icon: string
  label: string
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ icon, label }) => {
  return (
    <div className='SideBarButton'>
        <img src={icon}></img>
        <p>{label}</p>
    </div>
  )
}

export default SideBarButton
