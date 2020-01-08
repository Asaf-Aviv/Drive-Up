import React, { useRef } from 'react'
import { useOnVisibilityTrigger } from 'hooks'

type Props = {
  fetchNextPage: () => void
  loading: boolean
  error: boolean
  isLastPage: boolean
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const InfiniteMediaList = ({
  fetchNextPage,
  loading,
  error,
  isLastPage,
  children,
  className,
  as: Element = 'ul',
}: Props) => {
  const fetchNextPageTrigger = useRef<HTMLSpanElement>(null)

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPage)

  return (
    <Element className={className}>
      {children}
      {!loading && !error && !isLastPage && <span ref={fetchNextPageTrigger} />}
      {loading && <span>Loading...</span>}
      {error && <button type="button" onClick={fetchNextPage}>Retry</button>}
    </Element>
  )
}

export default InfiniteMediaList
