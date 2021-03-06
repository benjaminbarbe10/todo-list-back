const Press = require("../models/press");
const Landing = require("../models/landing");

//
// ─── PRESS_CONTROLLER ──────────────────────────────────────────────────────────
//
exports.list = (req, res, next) => Press.find((err, press) => {
  Landing
      .findOne({ tag: 'press' })
      .exec((pErr, landing) => {
        if (pErr) return next(pErr);
        if (!landing) return next();
        let selectedTag;
        return res.render('../templates/press.ejs', { press: press, selectedTag: selectedTag, landing: landing });
      });
});

exports.post = (req, res) => {
  const { error } = new Press(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Press.create(req.body).then(function(press) {
    res.send(press);
  });
};

exports.jsonlist = (req, res, next) => Press.find((err, press) => {
  if (err) return next(err);
  return res.json(press);
});

exports.show = (req, res, next) => {
  Press.findById(req.params.id, (err, press) => {
    if (!press) return next();
    res.json(press);
  });
};

exports.delete = (req, res, next) => {
  Press.findByIdAndRemove(req.params.id, (err, press) => {
    if (!press) return next();
    res.send("Has been deleted");
  });
};

exports.update = (req, res, next) => {
  Press.findByIdAndUpdate(req.params.id, req.body, (err, press) => {
    if (!press) return next();
    return Press.findById(req.params.id,(err, press) => {
      if (err) return next(err);
      return res.send(press);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

