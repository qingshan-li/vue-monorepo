import { createApp } from 'vue'
import loadings from './src/component.vue'

const inBrowser = typeof window !== 'undefined'

let queue = []

const Loading = function () {
    if (!inBrowser) {
        return {}
    }
    const loading = getInstance()
    loading.open()
    return loading
}

function createInstance() {
    const { instance } = mountComponent(loadings)
    return instance
}

function getInstance() {
    if (!queue.length) {
        const instance = createInstance()
        queue.push(instance)
    }

    return queue[queue.length - 1]
}

function mountComponent(RootComponent) {
    const app = createApp(RootComponent)
    const root = document.createElement('div')

    document.body.appendChild(root)

    return {
        instance: app.mount(root),
        unmount() {
            app.unmount()
            document.body.removeChild(root)
        },
    }
}

Loading.open = function () {
    const loading = getInstance()
    loading.open()
    return loading
}

Loading.colse = function () {
    const loading = getInstance()
    loading.close()
    return loading
}

export default Loading
