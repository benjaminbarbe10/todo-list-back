const Joi = require("joi");
const Project = require("../models/project");

//
// ─── PROJECT_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.findBySlug = (req, res, next) => {
  return Project
      .findOne({ slug: req.params.slug })
      .exec((pErr, project) => {
        if (pErr) {
          return next(pErr); // 500
        }

        if (!project) {
          return next(); // 404
        }

        return res.render('demo', { project: project });
      });
};

exports.list = (req, res) => {
  Project.find((err, projects) => {
    if (err) res.send({ message: "internal server error" });
    res.json(projects);
  });
};

exports.post = (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Project.create(req.body).then(function(project) {
    res.send(project);
  });
};

exports.show = (req, res) => {
  console.log(req)
  Project.findById(req.params.id, (err, project) => {
    if (!project) return res.status(404).send("Not found");
    res.json(project);
  });
};

exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (!project) return res.status(404).send("Not found");
    res.send("Has been deleted");
  });
};

exports.update = (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, (err, project) => {
    if (!project) return res.status(404).send("Not found");
    Project.findOne({
      _id: req.params.id
    }).then(project => {
      res.send(project);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

function validateProject(project) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    tags: Joi.required(),
    htag: Joi.string(),
    title: Joi.string()
        .required(),
    description: Joi.string()
        .required(),
    cities: Joi.string()
        .required(),
    surface: Joi.number()
        .integer()
        .required(),
    duration: Joi.number()
        .integer()
        .required(),
    budgect: Joi.string()
        .required(),
    images: Joi.required(),
    projects: Joi.array(),
    paragraph: Joi.any()

  };

  return Joi.validate(project, schema);
}
