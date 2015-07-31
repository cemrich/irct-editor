var events = require('events');
var irctParser = require('./irct-parser');

function IrctRenderer(stage, path) {

  function entryToHtml(entry) {
    var content = entry.content.replace(/^(\/\w*)/, '<span class="action">$1</span>');
    var marginTop = entry.delay / 1000;
    var entryHtml =
    `<div class="entry">
      <span class="delay">(${entry.delay})</span>
      <span class="character">${entry.character}</span>
      <span class="content" style="margin-top: ${marginTop}em">${content}</span>
    </div>`;
    return entryHtml;
  }

  function showEntry(entry) {
    stage.innerHTML = stage.innerHTML + entryToHtml(entry);
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
