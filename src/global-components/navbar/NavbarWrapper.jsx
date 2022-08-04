import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import './navbar.scss'

const NavbarWrapper = () => {
  return (
    <nav className='sticky-top navbar-wrapper text-white'>
         <DesktopNavbar className={'d-none d-sm-block'} />
         <MobileNavbar className={'d-sm-none'} />
    </nav>
  )
}

export default NavbarWrapper