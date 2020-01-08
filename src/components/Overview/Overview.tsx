import React, { Fragment } from 'react'
import { SectionTitle } from 'components'

type Props = {
  overview: string
  className?: string
  title?: string
}

const Overview = ({ overview, className, title = 'Overview' }: Props) => {
  if (!overview) return null

  const formatedOverview = overview.split('. ')
    .filter(Boolean)
    .map((line, i, arr) => (
      <Fragment key={line}>
        {i !== 0 && (
          <>
            <br />
            <br />
          </>
        )}
        {line}
        {arr.length - 1 !== i && '.'}
      </Fragment>
    ))

  return (
    <div className={className}>
      <SectionTitle>{title}</SectionTitle>
      <p>{formatedOverview}</p>
    </div>
  )
}

export default Overview
