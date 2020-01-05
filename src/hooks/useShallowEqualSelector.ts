import { shallowEqual, useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from 'store'

const useShallowEqualSelector: TypedUseSelectorHook<RootState> = selector =>
  useSelector(selector, shallowEqual)

export default useShallowEqualSelector
