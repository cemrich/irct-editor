var events = require('events');


function DragArea() {

  var dragArea = this;

  document.ondragover = function (e) {
    e.preventDefault();

    var allowDrop = e.dataTransfer.files.length === 1 &&
      e.dataTransfer.types[0] === 'Files' &&
      e.dataTransfer.files[0].path.endsWith('.irct');

    if (allowDrop) {
      e.dataTransfer.dropEffect = 'copy';
    } else {
      e.dataTransfer.dropEffect = 'none';
    }

    return allowDrop;
  };

  document.ondragleave = document.ondragend = function (e) {
    e.preventDefault();
    return false;
  };

  document.ondrop = function (e) {
    e.preventDefault();

    var path = e.dataTransfer.files[0].path;
    dragArea.emit('openFile', path);

    return true;
  };

};


DragArea.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = new DragArea();
