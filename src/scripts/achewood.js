// Description
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


import htmlparser from 'htmlparser';
import { select as Select } from 'soupselect';
import http from 'http';

const setupRobot = robot => {
  const ohnorobot = term => (new Promise((resolve, reject) => {
    const url = !!term
      ? 'http://www.ohnorobot.com/random.pl?comic=636'
      : `http://www.ohnorobot.com/index.pl?comic=636&lucky=1&s=${term}`;

    const request = http.get(url, response => {
      response.on('end', () => resolve(response.headers.location));
    });
  }));

  const extractComic = url => (new Promise((resolve, reject) => {
    const request = http.get(url, response => {
      const body = [];
      response.on('data', chunk => body.push(chunk));
      response.on('end', () => {
        const handler = new htmlparser.DefaultHandler();
        const parser = new htmlparser.Parser(handler);
        parser.parseComplete(body.join(''));

        const img = Select(handler.dom, 'img.comic');
        const comic = img[0].attribs;

        resolve({
          image: `http://achewood.com${comic.src}#.png`,
          title: comic.title,
        });
      });
    });
  }));

  const lookupAchewood = requested => {
    let response;
    if (!requested) {
      response = ohnorobot();
      response.then(url => extractComic(url));
    }
    else if (requested === 'latest') {
      response = extractComic('http://achewood.com');
    }
    else if (requested.match(/\d{2}.?\d{2}.?\d{4}/)) {
      const date = requested.replace(/\D/g, '');
      const url = `http://achewood.com/index.php?date=${date}`
      response = extractComic(url);
    }
    else {
      response = ohnorobot(term);
      response.then(url => extractComic(url));
    }

    return response;
  };

  const emitComic = (res, image, title) => {
    res.send(image);
    res.send(title);
  }

  const dateRegex = /achewood\s?((?:0[1-9]|1[0-2]).?(?:0[1-9]|[1-2][0-9]|3[0-1]).?(?:20\d{2})$|.*)?/i;
  robot.respond(dateRegex, res => {
    const requested = res.match[1];
    const comic = lookupAchewood(requested)
      .then(comic => emitComic(res, comic.image, comic.title));
  });
  robot.respond(/.*saddest thing\?*/i, res => {
    const saddest = res.random(['06022003', '11052001', '09052006', '07302007', '12102001']);
    const comic = lookupAchewood(saddest)
      .then(comic => emitComic(res, comic.image, comic.title));
  });

};

export default setupRobot;
