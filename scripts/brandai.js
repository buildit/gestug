'use strict';

var BRANDAI_INTEGRATION_USER_NAME = 'Brand.ai';
var kickoffBrandaiUpdate = function kickoffBrandaiUpdate(res) {
  res.send('I am in the ' + res.message.room + ' room');
  res.send('I detected a change in design library ' + res.match[1] + '.  Kicking off updates.');
  if (res.message.user.name === BRANDAI_INTEGRATION_USER_NAME) {
    res.send('I heard you, Brand.ai!');
  } else {
    res.send('You can\'t trick me, you\'re not a bot!');
  }
};

var kickoffManualBrandaiUpdate = function kickoffManualBrandaiUpdate(res) {
  // POST to /project/:username/:project/tree/:branch
  res.send('in this');
  if (res.message.user.name !== BRANDAI_INTEGRATION_USER_NAME) {
    res.send('Okay, ' + res.message.user.name + ', kicking off a new build.');
  }
};

var setupRobot = function setupRobot(robot) {
  robot.hear(/The color .* was changed in the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/A color was added to the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/The font family .* was added to the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/The (logo|icon|image) .* was added to the (.*) design library/, kickoffBrandaiUpdate);

  robot.hear(/kickoff brandai/, kickoffManualBrandaiUpdate);
};

module.exports = setupRobot;