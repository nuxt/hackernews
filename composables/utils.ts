export function lazyLoad (commit, task, optimistic, enabled?: boolean) {
  // By default, do lazy operations only in client
  if (enabled === undefined) {
    enabled = process.client
  }

  // Non lazy mode
  if (!enabled) {
    return task().then(commit).catch(console.error)
  }

  // Do real task in background
  Promise.resolve(task(optimistic))
    .then(commit)
    .catch(console.error)

  // Commit optimistic value and resolve
  return Promise.resolve(commit(optimistic))
}

export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace('?id=', '/')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') { parts.shift() }
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) { return pluralize(~~(between / 60), ' minute') } else if (between < 86400) { return pluralize(~~(between / 3600), ' hour') } else { return pluralize(~~(between / 86400), ' day') }
}

export function pluralize (time: number, label:string) {
  if (time === 1) { return time + label }

  return `${time + label}s`
}

export function isAbsolute (url: string) {
  return /^https?:\/\//.test(url)
}
