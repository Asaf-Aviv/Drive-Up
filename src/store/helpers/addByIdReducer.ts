function addByIdReducer<P extends { id: string }>(
  draft: Record<string, P | null>,
  payload: P[],
): void
function addByIdReducer<P extends { id: string } | null>(
  draft: Record<string, P | null>,
  payload: P,
  key: string,
): void
function addByIdReducer<P extends { id: string }>(
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

export default addByIdReducer
