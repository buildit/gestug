'use strict';

var _htmlparser = require('htmlparser');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _soupselect = require('soupselect');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise; // Description
//   Philippe is standing on it.
//
// Dependencies:
//  'htmlparser': '1.7.6'
//  'soupselect': '0.2.0'
//
// Configuration:
//   None
//
// Commands:
//   hubot achewood - A random Achewood comic
//   hubot achewood latest - The most recent Achewood comic
//   hubot achewood <date> - Achewood comic from <date> - mm/dd/yyyy format
//   hubot achewood <keyword> - Achewood comic for keyword
//   hubot saddest thing - The saddest thing, according to Lie Bot
//
// Author:
//   1000hz
//   Later hacked apart and redone in es6 by monksp


var setupRobot = function setupRobot(robot) {
  var ohnorobot = function ohnorobot(term) {
    return new _Promise(function (resolve, reject) {
      var url = !!term ? 'http://www.ohnorobot.com/random.pl?comic=636' : 'http://www.ohnorobot.com/index.pl?comic=636&lucky=1&s=' + term;

      var request = _http2.default.get(url, function (response) {
        response.on('end', function () {
          return resolve(response.headers.location);
        });
      });
    });
  };

  var extractComic = function extractComic(url) {
    return new _Promise(function (resolve, reject) {
      var request = _http2.default.get(url, function (response) {
        var body = [];
        response.on('data', function (chunk) {
          return body.push(chunk);
        });
        response.on('end', function () {
          var handler = new _htmlparser2.default.DefaultHandler();
          var parser = new _htmlparser2.default.Parser(handler);
          parser.parseComplete(body.join(''));

          var img = (0, _soupselect.select)(handler.dom, 'img.comic');
          var comic = img[0].attribs;

          resolve({
            image: 'http://achewood.com' + comic.src + '#.png',
            title: comic.title
          });
        });
      });
    });
  };

  var lookupAchewood = function lookupAchewood(requested) {
    var response = void 0;
    if (!requested) {
      response = ohnorobot();
      response.then(function (url) {
        return extractComic(url);
      });
    } else if (requested === 'latest') {
      response = extractComic('http://achewood.com');
    } else if (requested.match(/\d{2}.?\d{2}.?\d{4}/)) {
      var date = requested.replace(/\D/g, '');
      var url = 'http://achewood.com/index.php?date=' + date;
      response = extractComic(url);
    } else {
      response = ohnorobot(term);
      response.then(function (url) {
        return extractComic(url);
      });
    }

    return response;
  };

  var emitComic = function emitComic(res, image, title) {
    res.send(image);
    res.send(title);
  };

  var dateRegex = /achewood\s?((?:0[1-9]|1[0-2]).?(?:0[1-9]|[1-2][0-9]|3[0-1]).?(?:20\d{2})$|.*)?/i;
  robot.respond(dateRegex, function (res) {
    var requested = res.match[1];
    var comic = lookupAchewood(requested).then(function (comic) {
      return emitComic(res, comic.image, comic.title);
    });
  });
  robot.respond(/.*saddest thing\?*/i, function (res) {
    var saddest = res.random(['06022003', '11052001', '09052006', '07302007', '12102001']);
    var comic = lookupAchewood(saddest).then(function (comic) {
      return emitComic(res, comic.image, comic.title);
    });
  });
};

module.exports = setupRobot;