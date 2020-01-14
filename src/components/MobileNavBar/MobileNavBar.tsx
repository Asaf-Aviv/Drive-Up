import React, { useState } from 'react'
import { ExpandMore } from '@material-ui/icons'
import { NavLink as RouterNavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { categoryLinks } from 'components/CategoriesDropDown/CategoriesDropDown'
import { NavLink, Nav, NavSearchBar } from 'components'
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg'
import { useLockBodyScroll } from 'hooks'

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<number | null>(null)
  useLockBodyScroll(isOpen)

  const toggleOpenState = () => {
    setIsOpen(prevState => !prevState)
    if (isOpen) setOpenCategory(null)
  }

  const isActiveCategory = (categoryIndex: number) => categoryIndex === openCategory

  const toggleCategory = (categoryIndex: number) => () => {
    const isActive = isActiveCategory(categoryIndex)

    setOpenCategory(isActive ? null : categoryIndex)
  }

  return (
    <>
      <DrawerContainer isOpen={isOpen} onClick={toggleOpenState}>
        <NavWrapper onClick={e => e.stopPropagation()}>
          <Nav onLinkClick={toggleOpenState}>
            <CategoriesTitle as="span">Categories</CategoriesTitle>
            <div>
              {categoryLinks.map(({ title, links }, i) => (
                <CategoryWrapper key={title}>
                  <CategoryButton isOpen={isActiveCategory(i)} as="button" onClick={toggleCategory(i)}>
                    {title}
                    <ExpandMore />
                  </CategoryButton>
                  <CategoryList isOpen={isActiveCategory(i)}>
                    {links.map(({ to, label }) => (
                      <li key={to}>
                        <NavLink
                          as={RouterNavLink}
                          activeClassName="active"
                          to={to}
                          onClick={toggleOpenState}
                        >
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </CategoryList>
                </CategoryWrapper>
              ))}
            </div>
          </Nav>
        </NavWrapper>
      </DrawerContainer>
      <NavSearchBar />
      <MenuButton type="button" onClick={toggleOpenState}>
        <MenuIcon />
      </MenuButton>
    </>
  )
}

const CategoriesTitle = styled(NavLink)`
  &::after {
    display: none;
  }
`

const CategoryButton = styled(CategoriesTitle)<{ isOpen: boolean }>`
  background: transparent;
  border: none;
  font-weight: 500;
  width: 90px;
  justify-content: space-between;
  padding: 0.25rem;
  font-size: 1rem;
  > svg {
    transition: transform 250ms;
    ${props => props.isOpen && `
      transform: rotate(180deg);
    `}
  }
`

const DrawerContainer = styled.div<{ isOpen: boolean }>`
  ${(props) => {
    const { isOpen } = props

    return css`
      cursor: pointer;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      transition: transform 250ms;
      transform: translateX(${isOpen ? 0 : -100}%);
      background: rgba(0, 0, 0, 0.5);
      z-index: 1300;
    `
  }};
`

const CategoryWrapper = styled.div`
  padding-left: 1rem;
`

const CategoryList = styled.ul<{ isOpen: boolean }>`
  padding-left: 1rem;
  max-height: 0;
  transition: max-height 250ms;
  overflow: hidden;
  ${props => props.isOpen && `
    max-height: 500px;
  `};
`

const MenuButton = styled.button`
  margin-left: 1rem;
  background: transparent;
  border: none;
  > svg {
    height: 30px;
    width: 30px;
  }
`

const NavWrapper = styled.div`
  cursor: default;
  height: 100%;
  padding: 10vh 0 0 1rem;
  width: 70vw;
  background: ${props => props.theme.colors.primary};
  @media (min-width: 768px) {
    width: 40vw;
  }
`

export default MobileNavBar
