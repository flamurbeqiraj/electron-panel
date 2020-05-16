const { app, BrowserWindow, session } = require('electron');
const {ipcMain} = require('electron');

// Attach listener in the main process with the given ID
ipcMain.on('request-mainpage', (event, arg) => {
  let mainwin = new BrowserWindow({
    title: "SIT Panel",
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    show: false,
    icon:'./img/icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainwin.removeMenu();
  mainwin.loadFile('main.html');
  mainwin.maximize();
  mainwin.show();
});

function createPreWindow() {
  //Pre window.
  let prewin = new BrowserWindow({
    icon:'./img/icon.png',
    width: 250,
    height: 300,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // prewin.removeMenu()
  // and load the index.html of the app.
  prewin.loadFile('index.html')
}

app.whenReady().then(createPreWindow);