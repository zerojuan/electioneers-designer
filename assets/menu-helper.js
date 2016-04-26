'use strict';

const Menu = require( 'electron' ).Menu;

var template = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function( item, focusedWindow ) {
          if ( focusedWindow ) {
            focusedWindow.reload();
          }
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if ( process.platform == 'darwin' ) {
            return 'Ctrl+Command+F';
          } else {
            return 'F11';
          }
        })(),
        click: function( item, focusedWindow ) {
          if ( focusedWindow ) {
            focusedWindow.setFullScreen( !focusedWindow.isFullScreen() );
          }
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if ( process.platform == 'darwin' ) {
            return 'Alt+Command+I';
          } else {
            return 'Ctrl+Shift+I';
          }
        })(),
        click: function( item, focusedWindow ) {
          if ( focusedWindow ) {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  }
];

if ( process.platform == 'darwin' ) {
  var name = require( 'electron' ).app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      }
    ]
  });
}

let menu = Menu.buildFromTemplate( template );

module.exports = menu;
