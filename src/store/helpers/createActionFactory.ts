import { Action } from 'redux'

type Payload<T> = T extends { payload: infer P } ? P : undefined
type Metadata<T> = T extends { meta: infer M } ? M : undefined
type ActionCreatorParameters<A> = Parameters<
A extends { payload: infer P; meta: infer M }
  ? (payload: P, meta: { meta: M }) => void
  : A extends { payload: infer P }
    ? (payload: P) => void
    : A extends { meta: infer M }
      ? (payload: undefined, meta: M) => void
      : () => void>

/**
 * generic action factory which takes a union type of all possible actions
 * as a generic argument and returns a createAction function which takes in
 * a single string, the type of one of the actions and retuns an actionPayload function
 * which takes in the payload as the first argument and meta as the second argument
 */
function createActionFactory<PossibleActions extends Action>() {
  return function createAction<T extends PossibleActions['type']>(type: T) {
    function actionPayload(
      ...args: ActionCreatorParameters<Extract<PossibleActions, { type: T }>>
    ): Extract<PossibleActions, { type: T }>
    function actionPayload(payload?: Payload<PossibleActions>, meta?: Metadata<PossibleActions>) {
      return {
        type,
        ...(payload && { payload }) as {},
        ...(meta && { meta }) as {},
      }
    }
    return actionPayload
  }
}

export default createActionFactory
