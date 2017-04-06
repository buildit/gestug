module.exports = function(robot) {

  robot.hear(/A color was added to the (.*) design library/, function(res) {
    if (res.message.user.name == 'Brand.ai') {
      res.send('I heard you, Brand.ai!');
    }
    else {
      res.send('You can\'t trick me!');
    }

  });
  robot.hear(/yo/, function(msg) { msg.send('Yo') });

  robot.hear(/(.*)/, function(msg) {
    console.log(msg.match[1]);
    console.log(msg);
  });
}

// Brand.ai
// A color was added to the Primary Brand design library by walter.monks@wipro.com.\nUntitled Color:rgb(231, 67, 213)
