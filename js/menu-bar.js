var events = require('events');
var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');


function MenuBar() {

  var menuBar = this;

  var emitMessage = function (message) {
    return menuBar.emit(message);
  };

  var template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CommandOrControl+O',
          click: emitMessage.bind(menuBar, 'openFile')
        },
        {
          label: 'Quit',
          accelerator: 'CommandOrControl+Q',
          click: emitMessage.bind(menuBar, 'quit')
        }
      ]
    }
  ];

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

};


MenuBar.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = new MenuBar();
