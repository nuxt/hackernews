import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { host, isAbsolute, pluralize, timeAgo } from '../../app/utils'
import { feedsInfo, validFeeds } from '../../utils/api'

describe('host', () => {
  it('strips protocol and path', () => {
    expect(host('https://example.com/some/path')).toBe('example.com')
    expect(host('http://example.com')).toBe('example.com')
  })

  it('strips www', () => {
    expect(host('https://www.example.com/foo')).toBe('example.com')
  })

  it('keeps at most three domain parts', () => {
    expect(host('https://a.b.example.com/foo')).toBe('b.example.com')
  })
})

describe('pluralize', () => {
  it('does not pluralize one', () => {
    expect(pluralize(1, ' minute')).toBe('1 minute')
  })

  it('pluralizes other values', () => {
    expect(pluralize(0, ' minute')).toBe('0 minutes')
    expect(pluralize(5, ' hour')).toBe('5 hours')
  })
})

describe('timeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-10T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const now = () => Date.now() / 1000

  it('formats minutes', () => {
    expect(timeAgo(now() - 60)).toBe('1 minute')
    expect(timeAgo(now() - 60 * 30)).toBe('30 minutes')
  })

  it('formats hours', () => {
    expect(timeAgo(now() - 3600)).toBe('1 hour')
    expect(timeAgo(now() - 3600 * 5)).toBe('5 hours')
  })

  it('formats days', () => {
    expect(timeAgo(now() - 86400)).toBe('1 day')
    expect(timeAgo(now() - 86400 * 3)).toBe('3 days')
  })
})

describe('isAbsolute', () => {
  it('detects absolute urls', () => {
    expect(isAbsolute('https://example.com')).toBe(true)
    expect(isAbsolute('http://example.com')).toBe(true)
    expect(isAbsolute('/item/123')).toBe(false)
    expect(isAbsolute('item?id=123')).toBe(false)
  })
})

describe('feeds', () => {
  it('exposes the expected feeds', () => {
    expect(validFeeds).toEqual(['news', 'newest', 'ask', 'show', 'jobs'])
    for (const feed of validFeeds) {
      expect(feedsInfo[feed as keyof typeof feedsInfo].pages).toBeGreaterThan(0)
    }
  })
})
