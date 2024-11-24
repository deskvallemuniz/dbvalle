import { IpcHandler } from '../main/preload'

declare global {
    interface Window {
        ipc: IpcHandler,
        electronAPI: {
            on: (channel, callback) => void,
            send: (channel, args) => void
        }
    }
}
