import express from "express"
import apicache from "apicache"

const app = express()

// https://github.com/kwhitley/apicache
app.use(apicache.middleware("5 minutes"))

// apicache.options({ debug: true })

export default {
  path: "/api/",
  handler: app
}
