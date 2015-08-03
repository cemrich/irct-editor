"use strict";

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
    domElement.classList.add('dragover');

    var allowDrop = e.dataTransfer.files.length === 1 &&
      e.dataTransfer.types[0] === 'Files' &&
      e.dataTransfer.files[0].path.endsWith('.irct');

    if (allowDrop) {
      e.dataTransfer.dropEffect = 'copy';
    } else {
      e.dataTransfer.dropEffect = 'none';
      domElement.classList.add('invalid');
    }

    return allowDrop;
  };

  domElement.ondragleave = domElement.ondragend = function (e) {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      domElement.classList.remove('dragover');
      domElement.classList.remove('invalid');
      return false;
    }
  };

  domElement.ondrop = function (e) {
    e.preventDefault();
    domElement.classList.remove('dragover');
    domElement.classList.remove('invalid');

    var path = e.dataTransfer.files[0].path;
    dragArea.emit('openFile', path);

    return true;
  };

}


DragArea.prototype = Object.create(events.EventEmitter.prototype);
module.exports = DragArea;
