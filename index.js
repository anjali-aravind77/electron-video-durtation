const electron = require("electron");
const ffmpeg = require('fluent-ffmpeg');

// const w = new BrowserWindow({
// webPreferences: {
// nodeIntegration: true
// }
// })

// import electron from 'electron';

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', ()=> {
  // console.log("app is ready soon");
  mainWindow = new BrowserWindow ({
    webPreferences: {
    nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
ipcMain.on('video:submit', (event, path)=> {
  ffmpeg.ffprobe(path, (err, metadata) => {
    // console.log("hello");
    // console.log(metadata.format.duration);
      mainWindow.webContents.send('video:metadata', metadata.format.duration);

  });
});
