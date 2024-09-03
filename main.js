const  {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

// CREACION DE VENTANA

function createWindow(){
    let ventana = new BrowserWindow({
        width: 600,
        height: 700,
        webPreferences:{
            preload: path.join(app.getAppPath(),'preload.js')
        }
    })
    ventana.loadFile('index.html')
}

ipcMain.on('registroValido', function(event, args){
    console.log(args)
})

app.whenReady().then(createWindow)
