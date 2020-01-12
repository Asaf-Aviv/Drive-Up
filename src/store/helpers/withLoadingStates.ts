import { Action } from 'redux'

const startReducer = <S>(state: S): S => ({
  ...state,
  loading: true,
  error: false,
})

const successReducer = <S>(state: S): S => ({
  ...state,
  loading: false,
})

const errorReducer = <S>(state: S): S => ({
  ...state,
  error: true,
  loading: false,
})

type LoadingActionTypes = Record<'start' | 'success' | 'error', string>

const withLoadingStates = ({ start, success, error }: LoadingActionTypes) => {
  const actionReducerMapper = {
    [start]: startReducer,
    [success]: successReducer,
    [error]: errorReducer,
  }

  return <S, A extends Action>(baseReducer: (state: S | undefined, action: A) => S) => (
    state: S | undefined,
    action: A,
  ): S => {
    const nextState = actionReducerMapper[action.type]?.(state) ?? state
    return baseReducer(nextState, action)
  }
}

export default withLoadingStates
