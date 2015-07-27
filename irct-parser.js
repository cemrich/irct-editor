var fs = require('fs');
var moment = require('moment');

var linebreak = '\n';
var newline = linebreak + linebreak;
var commentPrefix = '//';


/**
 * @param {string} fileName    full path to the irct file to parse
 * @param {function} callback  Has to take an error object (or null
 *  on success) as first argument and the parsed srt file array (or
 *  null on eror) as second argument.
 *  The array will have following format:
 *  [
 *    {
 *      delay: <milliseconds>,
 *      character: <character name>,
 *      content: <(multiline) text>
 *    },
 *    { delay: ... }
 *  ]
 */
exports.parse = function (fileName, callback) {
  fs.readFile(fileName, 'utf8', function (err, data) {
    var srtEntries;
    if (err) {
      callback(err, null);
    } else {
      srtEntries = parseIrctContent(data);
      callback(null, srtEntries);
    }
  });
};


function parseIrctContent(text) {
  var srtEntries = [];
  var entryObj;

  text.split(newline).forEach(function (entry) {
    entryObj = parseIrctEntry(entry);

    if (entryObj !== null)
      srtEntries.push(entryObj);
  });

  return srtEntries;
}


function parseIrctEntry(entry) {
  entry = entry.split(linebreak);
  entry = entry.filter(function (element) {
    // filter out comment lines & remaining empty lines
    return element.substring(0, 2) !== commentPrefix &&
      element !== '';
  });

  if (entry.length === 0) // just a comment with newline
    return null;

  var timestamp = entry[0].substring(0, 12);
  var delay = parseTimestampToMilliseconds(timestamp);
  var character = entry[0].substring(13);
  var content = entry.slice(1).join(linebreak);

  var entryObj = {
    'delay': delay,
    'character': character,
    'content': content,
  };

  return entryObj;
}

function parseTimestampToMilliseconds(timestamp) {
  timestamp = timestamp.replace(',', '.');

  var duration = moment.duration(timestamp);
  return duration.asMilliseconds();
}
