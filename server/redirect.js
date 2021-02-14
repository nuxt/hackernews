import { validFeeds } from '../common/api'

export default function (req, res, next) {
  if (req.url === '/') {
    res.statusCode = 301
    const location = '/' + validFeeds[0]
    res.setHeader('Location', location)
    res.end(location)
  }
  next()
}
