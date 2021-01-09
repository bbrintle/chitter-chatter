const db = require("../models");

// Defining methods for the postController
module.exports = {
  findAll: function(req, res) {
    db.Post.find(req.query)
      .sort({ date: -1 })
      .then(chatdb => res.json(chatdb))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Post.findById(req.params.id)
      .then(chatdb => res.json(chatdb))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Post.create(req.body)
      .then(chatdb => res.json(chatdb))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Post.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(chatdb => res.json(chatdb))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Post.findById({ _id: req.params.id })
      .then(chatdb => chatdb.remove())
      .then(chatdb => res.json(chatdb))
      .catch(err => res.status(422).json(err));
  }
};
