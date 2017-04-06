module.exports = function(robot) {
  robot.hear(/yo/, function(msg) { msg.send('Yo') });

  robot.hear(/(.*)/, function(msg) {
    console.log(msg.match[1]);
  });
}
