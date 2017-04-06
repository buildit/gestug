module.exports = function(robot) {
  robot.hear(/yo/, function(msg) => { msg.send('Yo') });
}
