const electron = require( 'electron' );
const os = require( 'os' );
const log = require( './util.js' ).log;
const autoUpdater = electron.autoUpdater;
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

const isDev = require( 'electron-is-dev' );

const UPDATE_SERVER_HOST = 'electioneer-nuts.juliuscebreros.com';

function notify( title, message ) {
  let windows = BrowserWindow.getAllWindows();
  if ( windows.length === 0 ) {
    return;
  }

  windows[ 0 ].webContents.send( 'notify', title, message );
}

module.exports = {
  listenToUpdates: function( window ) {
    if ( isDev ) {
      return;
    }
    const version = app.getVersion();

    log( 'I am loaded what is up' );

    autoUpdater.addListener( 'checking-for-update', function() {
      log( 'Checking for update' );
    });

    autoUpdater.addListener( 'update-not-available', function() {
      log( 'Update not available' );
    });

    autoUpdater.addListener( 'update-available', function() {
      log( 'Update available' );
    });

    autoUpdater.addListener( 'update-downloaded',
      function( event, releaseNotes, releaseName, releaseDate, updateURL ) {
      notify( 'A new update is ready to install',
        'Version ' + releaseName + ' is downloaded and will be automatically installed on Quit' );
    });

    var url = 'http://' + UPDATE_SERVER_HOST +
      '/update/' + os.platform() + '/v' + version;
    log( url );
    autoUpdater.setFeedURL( url );

    window.webContents.once( 'did-finish-load', function( event ) {
      autoUpdater.checkForUpdates();
    });

  }
};
