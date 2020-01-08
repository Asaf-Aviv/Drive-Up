import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useShallowEqualSelector } from 'hooks'

/**
 * takes a redirectURL and a selector to search if a category exists in Redux store
 * otherwise redirects to @redirectURL
 * can only be used to check [type].byCategory[category] exist in Redux
 */

const withRedirect = (redirectURL: string, reduxSelector: (category: string) => any) => (
  WrappedComponent: React.ComponentType<any>,
) => {
  const WithRedirect = () => {
    const { category } = useParams<{ category: string }>()
    const hasCategoryInStore = useShallowEqualSelector(reduxSelector(category))
    return hasCategoryInStore
      ? <WrappedComponent category={category} />
      : <Redirect to={redirectURL} />
  }

  return WithRedirect
}

export default withRedirect
