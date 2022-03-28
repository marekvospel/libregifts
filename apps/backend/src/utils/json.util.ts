
export function getJson(object: any): JSON {
  return JSON.parse(JSON.stringify(object))
}
