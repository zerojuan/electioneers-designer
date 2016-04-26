'use strict';

const electron = require( 'electron' );
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Start the backend server, opening in port 7171
const serverApp = require( './index.js' );

const server = serverApp.listen( 7171, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log( 'Backend listening at http://%s:%s', host, port );
});

const menu = require( './menu-helper.js' );

function createWindow () {
  Menu.setApplicationMenu( menu );
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL( 'file://' + __dirname + '/index.html' );

  // Emitted when the window is closed.
  mainWindow.on( 'closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;

  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on( 'ready', createWindow );

// Quit when all windows are closed.
app.on( 'window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
});

app.on( 'activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if ( mainWindow === null ) {
    createWindow();
  }
});
