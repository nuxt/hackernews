export default ({ isDev, req, redirect }) => {
  // Redirect to https
  if (!isDev && req && !req.connection.encrypted) {
    return redirect(301, `https://${req.headers.host}${req.url}`)
  }
}
