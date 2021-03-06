import React from 'react'
import styled from 'styled-components'
import { CrewMember } from 'store/types'
import { ExternalLink, FieldValue } from 'components'

type Props = {
  mediaType: 'movie' | 'show'
  name: string
  runtime: string
  director?: CrewMember | null
  writers?: CrewMember[]
  countries?: string[]
  languages?: string[]
  budget?: number
  revenue?: number
  homepage: string | null
  seasons?: number
  episodes?: number
  className?: string
}

const MediaDetails = ({
  name,
  runtime,
  director,
  writers,
  budget,
  revenue,
  homepage,
  countries,
  languages,
  seasons,
  episodes,
  className,
}: Props) => {
  const renderDetailsField = (field: string, value: any) => (
    <MetaDataContainer>
      <FieldValue field={field} value={value} />
    </MetaDataContainer>
  )

  return (
    <div className={className}>
      {renderDetailsField('Name', name)}
      {director && renderDetailsField('Director', director.name)}
      {writers && renderDetailsField('Writers', writers.map(w => w.name).join(', '))}
      {runtime && renderDetailsField('Runtime', runtime)}
      {seasons && renderDetailsField('Seasons', seasons)}
      {episodes && renderDetailsField('Episodes', episodes)}
      {!!budget && renderDetailsField('Budget', `$${budget.toLocaleString()}`)}
      {!!revenue && renderDetailsField('Revenue', `$${revenue.toLocaleString()}`)}
      {languages && renderDetailsField('Languages', languages.join(', '))}
      {countries && renderDetailsField('Countries', countries.join(', '))}
      {homepage && <ExternalLink href={homepage} text="Homepage" />}
    </div>
  )
}

const MetaDataContainer = styled.div`
  margin-bottom: 1rem;
`

export default MediaDetails
