import { initializeApp, database } from 'firebase/app'

export async function createAPI({ config, version }) {
    await import(/* webpackChunkName: "firebase" */ 'firebase/database')
    initializeApp(config)
    return database().ref(version)
}
