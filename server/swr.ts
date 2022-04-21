export default (_, res, next) => {
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
  next()
}
