const Project = require('../models/project');
const Landing = require("../models/landing");

//
// ─── PROJECT_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.findBySlug = (req, res, next) => {
  return Project
      .findOne({ slug: req.params.slug })
      .exec((pErr, project) => {
        if (pErr) return next(pErr);
        if (!project) return next();
          Project.find((err, projects) => {
              if (err) return next(err);
              return res.render('../templates/project.ejs', { project: project, projects: projects   });
          });
      });
};

exports.list = (req, res, next) => Project.find((err, projects) => {
    Landing
        .findOne({ tag: 'projects' })
        .exec((pErr, landing) => {
            if (pErr) return next(pErr);
            if (!landing) return next();
            let selectedTag;
            return res.render('../templates/projects.ejs', { projects: projects, selectedTag: selectedTag,landing : landing });
        });
});

exports.jsonlist = (req, res, next) => Project.find((err, projects) => {
    if (err) return next(err);
    return res.json(projects);
});

exports.post = (req, res) => {
  const { error } = new Project(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  Project.create(req.body).then(function(project) {
    res.send(project);
  });
};

exports.show = (req, res, next) => {
  Project.findById(req.params.id, (err, project) => {
    if (!project) return next();
    res.json(project);
  });
};

exports.delete = (req, res, next) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (!project) return next();
    res.send('Has been deleted');
  });
};

exports.update = (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, (err, project) => {
    if (!project) return next();
    return Project.findById(req.params.id,(err, project) => {
      if (err) return next(err);
      return res.send(project);
    });
  });
};
