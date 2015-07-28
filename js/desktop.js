var fs = require('fs');
var remote = require('remote');
var dialog = remote.require('dialog');
var app = remote.require('app');
var IrctRenderer = require('./irct-renderer');
var DragArea = require('./drag-area');

var mainNode = document.getElementsByTagName('main')[0];
var titleNode = document.getElementsByTagName('title')[0];
var titlePrefix = titleNode.innerText;

function openFile(path) {
  var stage = document.getElementById('play');
  var irctRenderer = new IrctRenderer(stage, path);
  app.addRecentDocument(path);
  mainNode.classList.remove('nofile');
  titleNode.innerText = titlePrefix + ' – ' + path;
}

function showFileDialog() {
  dialog.showOpenDialog(
    {
      filters: [ { name: 'IRC Theatre File', extensions: ['irct'] } ],
      properties: [ 'openFile' ]
    },
  function (path) {
    if (typeof path !== 'undefined') {
      openFile(path[0]);
    }
  });
}

// set up file drag & drop
var dragArea = new DragArea(mainNode);

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
