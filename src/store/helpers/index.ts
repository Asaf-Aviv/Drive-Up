// "action type creator", construct an action
// based on generic arguments.
// T as the type of the action
// P as the payload of the action
// M as the meta of the action
// when payload is ommited and meta is not, the second
// argument passed to the generic must be undefined
export type Action<T, P = undefined, M = undefined> = P extends undefined
  ? M extends undefined
    ? { type: T }
    : { type: T; meta: M }
  : M extends undefined
  ? { type: T; payload: P }
  : { type: T; payload: P; meta: M }
