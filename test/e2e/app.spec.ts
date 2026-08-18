import { fileURLToPath } from 'node:url'
import { afterAll, describe, expect, it } from 'vitest'
import { $fetch, fetch, setup } from '@nuxt/test-utils/e2e'
import { startMockHackerNews } from './mock-hn'

const mock = await startMockHackerNews()
process.env.HN_API_BASE = mock.url

await setup({
  rootDir: fileURLToPath(new URL('../..', import.meta.url)),
  server: true,
  env: {
    HN_API_BASE: mock.url,
  },
})

afterAll(() => mock.close())

describe('server api', () => {
  it('returns a feed', async () => {
    const feed = await $fetch<{ id: number, title: string }[]>('/api/hn/feeds')
    expect(feed).toHaveLength(2)
    expect(feed[0]).toMatchObject({
      id: 100,
      title: 'A top story',
      user: 'daniel',
      points: 42,
      comments_count: 2,
    })
  })

  it('rejects unknown feeds and invalid pages', async () => {
    for (const query of ['?feed=nope', '?page=abc']) {
      const res = await fetch(`/api/hn/feeds${query}`)
      expect(res.status).toBe(422)
    }
  })

  it('returns an item with nested comments', async () => {
    const item = await $fetch<{ comments: { id: number, comments: { id: number }[] }[] }>('/api/hn/item?id=100')
    expect(item.comments.map(c => c.id)).toEqual([200, 201])
    expect(item.comments[0]!.comments.map(c => c.id)).toEqual([202])
  })

  it('validates item ids', async () => {
    expect((await fetch('/api/hn/item')).status).toBe(422)
    expect((await fetch('/api/hn/item?id=abc')).status).toBe(400)
  })

  it('returns a user', async () => {
    const user = await $fetch<{ id: string, karma: number }>('/api/hn/user?id=daniel')
    expect(user).toMatchObject({ id: 'daniel', karma: 1234 })
  })

  it('validates user ids', async () => {
    expect((await fetch('/api/hn/user')).status).toBe(422)
  })
})

describe('pages', () => {
  it('server-renders the news feed on the home page', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('A top story')
    expect(html).toContain('(example.com)')
    expect(html).toContain('Ask HN: A question')
  })

  it('server-renders feed pages', async () => {
    const html = await $fetch<string>('/ask/1')
    expect(html).toContain('A top story')
  })

  it('redirects unknown feeds', async () => {
    const res = await fetch('/nope/1', { redirect: 'manual' })
    expect([301, 302, 307, 308]).toContain(res.status)
  })

  it('server-renders an item page with comments', async () => {
    const html = await $fetch<string>('/item/100')
    expect(html).toContain('A top story')
    expect(html).toContain('A comment')
    expect(html).toContain('A nested reply')
  })

  it('server-renders a user page', async () => {
    const html = await $fetch<string>('/user/daniel')
    expect(html).toContain('daniel')
    expect(html).toContain('1234')
  })
})
