var events = require('events');


function DragArea(domElement) {

  var dragArea = this;

  // prevent drag&drop on footer, etc.
  document.ondragover =
  document.ondrop =
  document.ondragleave =
  document.ondragend = function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'none';
    return false;
  };

  domElement.ondragover = function (e) {
    e.preventDefault();
    e.stopPropagation();

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

  domElement.ondragleave = domElement.ondragend = function (e) {
    e.preventDefault();
    return false;
  };

  domElement.ondrop = function (e) {
    e.preventDefault();

    var path = e.dataTransfer.files[0].path;
    dragArea.emit('openFile', path);

    return true;
  };

};


DragArea.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = DragArea;
