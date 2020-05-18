const electron = require('electron')
const iconimage = electron.nativeImage.createFromPath(`${__dirname}/logo.png`)
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 740,
    height: 665,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(
    `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
