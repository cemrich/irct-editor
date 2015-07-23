var fs = require('fs');
var remote = require('remote');
var dialog = remote.require('dialog');
var app = remote.require('app');

function openFile(path) {
  console.log('open file: ' + path);

  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      app.addRecentDocument(path);
      document.getElementById('play').innerText = data;
    }
  });
}

function showFileDialog() {
  dialog.showOpenDialog(
    {
      filters: [ { name: 'IRC Theatre File', extensions: ['irct'] } ],
      properties: [ 'openFile' ]
    },
  function (path) {
    openFile(path[0]);
  });
}

// set up file drag & drop
var dragArea = require('./drag-area');

dragArea.on('openFile', function (path) {
  openFile(path);
});


// set up menu bar
var menuBar = require('./menu-bar');

menuBar.on('openFile', function () {
  showFileDialog();
});

menuBar.on('quit', function () {
  app.quit();
});
