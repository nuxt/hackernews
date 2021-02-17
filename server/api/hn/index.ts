import { createApp } from 'h3'

export const baseURL = 'https://hacker-news.firebaseio.com/v0'

const app = createApp({
  onError: (error) => {
    console.log(error)
  }
})

app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=100, stale-while-revalidate')
  next()
})

app.use('/item', () => import('./item'), { lazy: true })

app.use('/user', () => import('./user'), { lazy: true })

app.use(() => import('./feeds'), { lazy: true })

export default app
