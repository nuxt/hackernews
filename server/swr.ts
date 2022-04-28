import type { H3Response } from 'h3'

export function configureSWRHeaders (res: H3Response) {
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
}
