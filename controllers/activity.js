const models = require('../models');

module.exports = {
  list: (req, res) => {
    let searchParams = req.query;
    models.activity.findAll({
      where: searchParams
    }).then((activities) => {
      res.json(activities);
    });
  },
  detail: (req, res) => {
    let entryId = req.params.id;
    models.activity.findById(entryId).then((activity) => {
      res.json(activity);
    })
  },
  create: (req, res) => {
    let loggedId = req.user.id;
    models.activity.create({
      title: req.body.title,
      date: req.body.date,
      number: req.body.number,
      userId: loggedId
    }).then((results) => {
      res.json(results);
    });
  },
  update: (req, res) => {
    let entryId = req.params.id;
    models.activity.findById(entryId).then((activity) => {
      activity.update({
        title: req.body.title,
        date: req.body.date,
        number: req.body.number
      }).then((result) => {
          res.json(result);
      });
    });
  },
  delete: (req, res) => {
    let entryId = req.params.id;
    models.activity.destroy({
      where: {id: entryId}
    }).then((activity) => {
      let message = 'entry deleted';
      res.json({message: message});
    })
  },
  listActivity: (req, res) => {
    let activity = req.params.activity
    models.activity.findAll({
      where: {title: activity}
    }).then((activities) => {
      res.json(activities);
    });
  }
}
