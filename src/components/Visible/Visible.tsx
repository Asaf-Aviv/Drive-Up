import React from 'react'

type Props = {
  when: any
  children: React.ReactNode
}

const Visible = ({ when, children }: Props) => when
  ? <>{children}</>
  : null

export default Visible
