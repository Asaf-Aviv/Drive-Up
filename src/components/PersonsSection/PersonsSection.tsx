import React from 'react'
import { SectionTitle, PersonsGrid, PersonCard } from 'components'
import uniqBy from 'lodash.uniqby'
import LazyLoad from 'react-lazyload'
import { CrewMember, CastMember } from 'store/types'

type Props = {
  title: string
  persons: (CrewMember | CastMember)[]
}

const PersonsSection = ({ persons, title }: Props) => {
  if (!persons[0]) return null

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <PersonsGrid>
        <LazyLoad offset={400} once>
          {uniqBy(persons, 'id')
            .filter(person => person.poster)
            .slice(0, 8)
            .map(person => (
              <li key={person.id}>
                <PersonCard {...person} />
              </li>
            ))}
        </LazyLoad>
      </PersonsGrid>
    </>
  )
}

export default PersonsSection
