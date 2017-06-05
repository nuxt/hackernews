import Vue from 'vue'
import { sync } from 'vuex-router-sync'

export default function ({ app, store }) {
  sync(store, app.router)
}
