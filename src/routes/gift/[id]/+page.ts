import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {

  if (!params.id) return {}

  return { id: params.id }
}