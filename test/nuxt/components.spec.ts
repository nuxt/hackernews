import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { Item } from '~~/types'
import PostItem from '~/components/PostItem.vue'
import ItemListNav from '~/components/ItemListNav.vue'

const story: Item = {
  id: 1,
  title: 'A story',
  url: 'https://www.example.com/story',
  type: 'story',
  points: 42,
  user: 'daniel',
  time: String(Math.floor(Date.now() / 1000) - 120),
  comments_count: 7,
}

describe('PostItem', () => {
  it('renders an external story with host and comments', async () => {
    const wrapper = await mountSuspended(PostItem, { props: { item: story } })
    const link = wrapper.get('.title a')
    expect(link.attributes('href')).toBe(story.url)
    expect(link.text()).toBe('A story')
    expect(wrapper.get('.host').text()).toBe('(example.com)')
    expect(wrapper.get('.score').text()).toBe('42')
    expect(wrapper.get('.comments-link').text()).toContain('7 comments')
    expect(wrapper.get('.time').text()).toContain('2 minutes ago')
  })

  it('links internally for items without a url', async () => {
    const ask: Item = { ...story, url: undefined as never, id: 2 }
    const wrapper = await mountSuspended(PostItem, { props: { item: ask } })
    expect(wrapper.get('.title a').attributes('href')).toBe('/item/2')
  })

  it('hides author and comments for jobs', async () => {
    const job: Item = { ...story, type: 'job' }
    const wrapper = await mountSuspended(PostItem, { props: { item: job } })
    expect(wrapper.find('.by').exists()).toBe(false)
    expect(wrapper.find('.comments-link').exists()).toBe(false)
  })
})

describe('ItemListNav', () => {
  it('renders pagination links', async () => {
    const wrapper = await mountSuspended(ItemListNav, {
      props: { feed: 'news', page: 2, maxPage: 10 },
    })
    expect(wrapper.get('.page').text()).toBe('2 / 10')
    const links = wrapper.findAll('a').map(a => a.attributes('href'))
    expect(links).toContain('/news/1')
    expect(links).toContain('/news/3')
  })

  it('disables prev on the first page and more on the last', async () => {
    const wrapper = await mountSuspended(ItemListNav, {
      props: { feed: 'ask', page: 1, maxPage: 1 },
    })
    expect(wrapper.findAll('a')).toHaveLength(0)
    expect(wrapper.findAll('.disabled')).toHaveLength(2)
  })
})
