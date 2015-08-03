var events = require('events');
var irctParser = require('./irct-parser');

function IrctRenderer(stage, path) {

  function entryToHtml(entry) {
    var entryHtml = document.createElement("irct-entry");
    entryHtml.setAttribute("delay", entry.delay);
    entryHtml.setAttribute("character", entry.character);
    entryHtml.textContent = entry.content;
    return entryHtml;
  }

  function showEntry(entry) {
    stage.appendChild(entryToHtml(entry));
  }

  function onParseFinished(error, data) {
    if (error === null) {
      stage.innerHTML = '';
      data.forEach(showEntry);
    } else {
      stage.innerText = 'An error ocurred loading file ' + path + '\n' + error;
    }
  };

  irctParser.parse(path, onParseFinished);
};


IrctRenderer.prototype.__proto__ = events.EventEmitter.prototype;
module.exports = IrctRenderer;
