import React, { useState } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { ExpandMore } from '@material-ui/icons'
import styled from 'styled-components'
import { NavLink } from 'components'

export const categoryLinks = [
  {
    title: 'Movies',
    links: [
      { to: '/movies/popular', label: 'Popular' },
      { to: '/movies/top_rated', label: 'Top Rated' },
      { to: '/movies/upcoming', label: 'Coming Soon' },
      { to: '/movies/now_playing', label: 'In Theatres' },
    ],
  },
  {
    title: 'Shows',
    links: [
      { to: '/shows/popular', label: 'Popular' },
      { to: '/shows/top_rated', label: 'Top Rated' },
      { to: '/shows/airing_today', label: 'Airing Today' },
      { to: '/shows/on_the_air', label: 'On The Air' },
    ],
  },
]

const CategoriesDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropDownContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <StyledNavLink>
        Categories
        <ExpandMore width={24} height={24} />
      </StyledNavLink>
      {isOpen && (
        <DropDownWrapper>
          <DropDown>
            {categoryLinks.map(({ title, links }) => (
              <div key={title}>
                <CategoryTitle>{title}</CategoryTitle>
                <ul>
                  {links.map(({ to, label }) => (
                    <DropDownItem key={to}>
                      <NavLink
                        as={RouterNavLink}
                        activeClassName="active"
                        to={to}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </NavLink>
                    </DropDownItem>
                  ))}
                </ul>
              </div>
            ))}
          </DropDown>
        </DropDownWrapper>
      )}
    </DropDownContainer>
  )
}

const CategoryTitle = styled.h6`
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
`

const DropDownContainer = styled.div`
  margin-right: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  @media (min-width: 1100px) {
    height: 100%;
  }
`

const StyledNavLink = styled.span`
  padding: 0.5rem 0;
  color: #FFF;
  display: flex;
  align-items: center;
  & .MuiSvgIcon-root {
    transform: scale(1.5);
    margin-left: 0.5rem;
  }
`

const DropDown = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  background: ${props => props.theme.colors.primary};
  width: 400px;
  padding: 1rem;
  margin-top: 25px;
  &::before {
    content: '';
    position: absolute;
    top: -25px;
    border-style: solid;
    border-width: 0 25px 25px 25px;
    border-color: transparent transparent ${props => props.theme.colors.primary} transparent;
  }
`

const DropDownWrapper = styled.div`
  position: absolute;
  top: 64px;
  right: 50%;
  transform: translateX(50%);
`

const DropDownItem = styled.li`
  margin-bottom: 1rem;
`

export default CategoriesDropDown
