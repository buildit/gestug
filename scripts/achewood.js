// // # Description
// // #   Philippe is standing on it.
// // #
// // # Dependencies:
// // #  'htmlparser': '1.7.6'
// // #  'soupselect': '0.2.0'
// // #
// // # Configuration:
// // #   None
// // #
// // # Commands:
// // #   hubot achewood - A random Achewood comic
// // #   hubot achewood current - The most recent Achewood comic
// // #   hubot achewood <date> - Achewood comic from <date> - mm/dd/yyyy format
// // #   hubot achewood <keyword> - Achewood comic for keyword
// // #   hubot saddest thing - The saddest thing, according to Lie Bot
// // #
// // # Author:
// // #   1000hz
//
// var htmlparser = require('htmlparser');
// var Select = require('soupselect').select;
//
// module.exports = function(robot) {
//   var withDate = function(date) { return 'http://achewood.com/index.php?date=' + date }
//
//   var fetchAchewood = function(msg, url) {
//     console.log(url);
//     msg.http(url).get()(function(err, res, body) {
//       var handler = new htmlparser.DefaultHandler();
//       var parser = new htmlparser.Parser(handler);
//
//       parser.parseComplete(body);
//       var img = Select(handler.dom, 'img.comic');
//       var comic = img[0].attribs;
//
//       msg.send('http://achewood.com' + comic.src + '#.png');
//       msg.send(comic.title);
//     });
//   };
//
//   var dateRegex = /achewood\s?((?:0[1-9]|1[0-2]).?(?:0[1-9]|[1-2][0-9]|3[0-1]).?(?:20\d{2})$|.*)?/i;
//   robot.respond(dateRegex, function(msg) {
//     var arg = msg.match[1];
//     if (!arg) {
//       msg.http('http://www.ohnorobot.com/random.pl?comic=636')
//         .get()(function(err, res, body) { fetchAchewood(msg, res.headers['location'])});
//     }
//     else if (arg === 'current') {
//       fetchAchewood(msg, 'http://achewood.com');
//     }
//     else if (arg.match(/\d{2}.?\d{2}.?\d{4}/)) {
//       fetchAchewood(msg, withDate(arg.replace(/\D/g, '')));
//     }
//     else {
//       msg.http('http://www.ohnorobot.com/index.pl?comic=636&lucky=1&s=' + arg)
//         .get()(function(err, res, body) { fetchAchewood(msg, res.headers['location'])});
//     }
//   });
//
//   robot.respond(/.*saddest thing\?*/i, function(msg) {
//     var saddest = msg.random(['06022003', '11052001', '09052006', '07302007', '12102001']);
//     fetchAchewood(msg, withDate(saddest));
//   });
// };