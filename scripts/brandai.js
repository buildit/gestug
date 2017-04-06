module.exports = function(robot) {

  var kickoffBrandaiUpdate = function(res) {
    console.log('in this');
    res.send('The design library I detected was ' + res.match[1]);
    if (res.message.user.name == 'Brand.ai') {
      res.send('I heard you, Brand.ai!');
    }
    else {
      res.send('You can\'t trick me!');
    }
  }

  var kickoffManualBrandaiUpdate = function(res) {
    if (res.message.user.name !== 'Brand.ai') {
      res.send('Kicking off!');
    }
  }

  robot.hear(/The color .* was changed in the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/A color was added to the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/The font family .* was added to the (.*) design library/, kickoffBrandaiUpdate);
  robot.hear(/The (logo|icon|image) .* was added to the (.*) design library/, kickoffBrandaiUpdate);

  robot.hear(/kickoff brandai/, kickoffManualBrandaiUpdate)
}

// Brand.ai
// A color was added to the Primary Brand design library by walter.monks@wipro.com.\nUntitled Color:rgb(231, 67, 213)
// The font family Helvetica was added to the Primary Brand design library
// The color “Brand 3” was changed in the Primary Brand design library
// The icon "rocket.svg" was added to the Primary Brand design library
// The image "sea_view.jpg" was added to the Primary Brand design library
// The logo "icon-logo.svg" was added to the Primary Brand design library
