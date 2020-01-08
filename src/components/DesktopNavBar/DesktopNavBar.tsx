import React from 'react'
import { Nav, NavSearchBar, CategoriesDropDown } from 'components'

const DesktopNavBar = () => (
  <>
    <Nav>
      <CategoriesDropDown />
    </Nav>
    <NavSearchBar />
  </>
)

export default DesktopNavBar
