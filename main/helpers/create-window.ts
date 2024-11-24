import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
  ipcMain
} from 'electron'
import Store from 'electron-store'
import knex from 'knex'

export const createWindow = (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  const key = 'window-state'
  const name = `window-state-${windowName}`
  const store = new Store<Rectangle>({ name })
  const defaultSize = {
    width: options.width,
    height: options.height
  }
  let state = {}

  const restore = () => store.get(key, defaultSize)

  const getCurrentPosition = () => {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    }
  }

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    )
  }

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    })
  }

  const ensureVisibleOnSomeDisplay = windowState => {
    const visible = screen.getAllDisplays().some(display => {
      return windowWithinBounds(windowState, display.bounds)
    })
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults()
    }
    return windowState
  }

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
    store.set(key, state)
  }

  state = ensureVisibleOnSomeDisplay(restore())

  const win = new BrowserWindow({
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      ...options.webPreferences
    }
  })

  ipcMain.on("fetch-data", async (event, data) => {
    const connection = await knex({
      client: 'mysql',
      connection: 'mysql://root:123456@185.173.110.169:32769/afiliado'
    })

    const info = await connection.raw(data.filter)
    console.log("I", info)
    event.reply("fetch-data-main", { tab: data.tab, data: info[0], metadata: info[1] })
  })

  ipcMain.on('ipc-example', async (event, data) => {

    const connection = await knex({
      client: 'mysql',
      connection: 'mysql://root:123456@185.173.110.169:32769/afiliado'
    })

    await connection.raw("SELECT 1").then(() => {
      console.log("PostgreSQL connected");
    })
      .catch((e) => {
        console.log("PostgreSQL not connected");
        console.error(e);
      });

    const info = await connection.raw("SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = 'afiliado'")
    console.log("I", info)


    event.reply("table-info", { data: info[0], medatada: info[1] })
  })

  win.on('close', saveState)

  return win
}
