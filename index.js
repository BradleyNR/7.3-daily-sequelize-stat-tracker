const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const models = require('./models');
const activityController = require('./controllers/activity');
const userController = require('./controllers/user');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const app = express();
app.use(bodyParser.json());

passport.use(new BasicStrategy((username, password, done) => {
  models.User.findOne({
    where: {username: username}
  }).then((user) => {
    if (!user) {
      return done(null, false);
    } else if (user.password !== password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  });
}));

app.get('/api/activities', passport.authenticate('basic', {session: false}), activityController.list);
app.get('/api/activities/:activity', passport.authenticate('basic', {session: false}), activityController.listActivity);
app.post('/api/activities', passport.authenticate('basic', {session: false}), activityController.create);
app.get('/api/activities/:id', passport.authenticate('basic', {session: false}), activityController.detail);
app.put('/api/activities/:id', passport.authenticate('basic', {session: false}), activityController.update);
app.delete('/api/activities/:id', passport.authenticate('basic', {session: false}), activityController.delete);
app.post('/api/users', userController.create);
app.get('/api/', passport.authenticate('basic', {session: false}), userController.list);



app.listen(3000);
