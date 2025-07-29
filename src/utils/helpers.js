export function safeParse(json) {
  try {
    return JSON.parse(json ?? '')
  } catch (e) {
    return null
  }
}
