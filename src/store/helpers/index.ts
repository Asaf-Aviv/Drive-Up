import { ShortMedia } from 'store/types'
import { select } from 'redux-saga/effects'

export function* filterExistingMedia(
  resources: ShortMedia[],
  reducerName: 'shortMovies' | 'shortShows',
) {
  const existingMedias = yield select(state => state[reducerName])
  return resources.filter(({ id }) => !(id in existingMedias))
}

export function addByIdReducer<P extends { id: string }>(
  draft: Record<string, P | null>,
  payload: P[],
): void
export function addByIdReducer<P extends { id: string } | null>(
  draft: Record<string, P | null>,
  payload: P,
  key: string,
): void
export function addByIdReducer<P extends { id: string }>(
  draft: Record<string, P | null>,
  payload: P | null | P[],
  key?: string,
) {
  if (Array.isArray(payload)) {
    return payload.forEach((resource) => {
      draft[resource.id] = resource
    })
  }
  key && (draft[key] = payload)
}

// "action type creator", construct an action type
// based on generic arguments.
// T as the type of the action
// P as the payload of the action
// M as the meta of the action
// when payload is ommited and meta is not, the second
// argument passed to the generic must be undefined
export type Action<T, P = undefined, M = undefined> =
  P extends undefined
    ? M extends undefined
      ? { type: T }
      : { type: T; meta: M }
    : M extends undefined
      ? { type: T; payload: P }
    : { type: T; payload: P; meta: M }
