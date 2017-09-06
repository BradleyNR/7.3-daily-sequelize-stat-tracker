const models = require('../models');

module.exports = {
  list: (req, res) => {
    if (req.user) {
      message = req.user.username;
    } else {
      message = "No user logged in!";
    }
    res.json({message: message});
  },
  create: (req, res) => {
    models.User.create({
      username: req.body.username,
      password: req.body.password
    }).then((user) => {
      res.json(user);
    });
  }
};
