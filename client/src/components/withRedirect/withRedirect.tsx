import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';

interface Params {
  category: string;
}

interface WithRedirect extends RouteComponentProps<Params> {
  redirectURL: string;
  reduxSelector: (arg: string) => any;
}

/**
 * takes a redirectURL and a selector to search if a gategory exists in Redux store
 * otherwise redirects to @redirectURL
 * can only be used to check [type].byCategory[category] exist in Redux
 */

const withRedirect = (redirectURL: string, reduxSelector: (arg: string) => any) => (
  WrappedComponent: React.ComponentType<any>
) => {
  const WithRedirect: React.FC<WithRedirect> = ({ match: { params: { category } }, ...rest }) => {
    console.log(rest);
    const isValid = useShallowEqualSelector(reduxSelector(category));
    return isValid ? <WrappedComponent category={category} /> : <Redirect to={redirectURL} />;
  };

  return WithRedirect;
};

export default withRedirect;
