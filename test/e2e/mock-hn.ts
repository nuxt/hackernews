import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'

const items: Record<number, Record<string, unknown>> = {
  100: {
    id: 100,
    by: 'daniel',
    score: 42,
    time: Math.floor(Date.now() / 1000) - 3600,
    title: 'A top story',
    url: 'https://example.com/story',
    type: 'story',
    kids: [200, 201],
  },
  101: {
    id: 101,
    by: 'someone',
    score: 10,
    time: Math.floor(Date.now() / 1000) - 7200,
    title: 'Ask HN: A question',
    text: '<p>The question body</p>',
    type: 'story',
  },
  200: {
    id: 200,
    by: 'commenter',
    time: Math.floor(Date.now() / 1000) - 1800,
    text: '<p>A comment</p>',
    type: 'comment',
    kids: [202],
  },
  201: {
    id: 201,
    by: 'other',
    time: Math.floor(Date.now() / 1000) - 900,
    text: '<p>Another comment</p>',
    type: 'comment',
  },
  202: {
    id: 202,
    by: 'nested',
    time: Math.floor(Date.now() / 1000) - 600,
    text: '<p>A nested reply</p>',
    type: 'comment',
  },
}

const users: Record<string, Record<string, unknown>> = {
  daniel: {
    id: 'daniel',
    karma: 1234,
    created: Math.floor(Date.now() / 1000) - 86400 * 365,
    about: 'Test user',
  },
}

export async function startMockHackerNews() {
  const server = createServer((req, res) => {
    const url = req.url || ''
    const json = (body: unknown) => {
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify(body))
    }
    if (/^\/(top|new|ask|show|job)stories\.json/.test(url)) {
      return json([100, 101])
    }
    const item = url.match(/^\/item\/(\d+)\.json/)
    if (item) {
      return json(items[Number(item[1])] ?? null)
    }
    const user = url.match(/^\/user\/([^.]+)\.json/)
    if (user) {
      return json(users[user[1]!] ?? null)
    }
    res.statusCode = 404
    res.end('not found')
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address() as AddressInfo
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve, reject) =>
      server.close(err => err ? reject(err) : resolve()),
    ),
  }
}
