module.exports = function(robot) {

  var kickoffBrandaiUpdate = function(res) {
    console.log('in this');
    res.send('The design library I detected was ' + msg.match[1]);
    if (res.message.user.name == 'Brand.ai') {
      res.send('I heard you, Brand.ai!');
    }
    else {
      res.send('You can\'t trick me!');
    }
  }

  robot.hear(/The color .? was changed in the (.?) design library/, kickoffBrandaiUpdate);
  robot.hear(/A color was added to the (.?) design library/, kickoffBrandaiUpdate);
  robot.hear(/The font family .? was added to the (.?) design library/, kickoffBrandaiUpdate);
  robot.hear(/yo/, function(msg) { msg.send('Yo') });

  robot.hear(/(.*)/, function(msg) {
    console.log(msg.match[1]);
    console.log(msg);
  });
}

// Brand.ai
// A color was added to the Primary Brand design library by walter.monks@wipro.com.\nUntitled Color:rgb(231, 67, 213)
// The font family Helvetica was added to the Primary Brand design library
// The color “Brand 3” was changed in the Primary Brand design library
