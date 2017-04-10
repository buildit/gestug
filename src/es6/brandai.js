const BRANDAI_INTEGRATION_USER_NAME = 'Brand.ai';
const kickoffBrandaiUpdate = res => {
  res.send(`I detected a change in design library ${res.match[1]}.  Kicking off updates.`);
  if (res.message.user.name == BRANDAI_INTEGRATION_USER_NAME) {
    res.send('I heard you, Brand.ai!');
  }
  else {
    res.send('You can\'t trick me, you\'re not a bot!');
  }
}

const kickoffManualBrandaiUpdate = res => {
  if (res.message.user.name !== BRANDAI_INTEGRATION_USER_NAME) {
    res.send(`Okay, ${res.message.user.name}, kicking off a new build.`);
  }
}

const setupRobot = robot => {
  robot.hear(/The color .* was changed in the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/A color was added to the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/The font family .* was added to the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/The (logo|icon|image) .* was added to the (.*) design library/, kickoffBrandaiUpdate);

  robot.respond(/kickoff brandai/, kickoffManualBrandaiUpdate)

}

module.exports = setupRobot;
