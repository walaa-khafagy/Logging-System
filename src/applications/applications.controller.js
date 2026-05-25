import Application from "./applications.model.js";

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({  developer: req.user.id });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const getApplicationByName = async (req, res, next) => {
  try {
    const application = await Application.findOne({name: req.params.name});
    res.json(application);
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (req, res, next) => {
  try {
    const application = await Application.create({ name: req.body.name, developer: req.user.id });
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    await Application.findOneAndDelete({ name: req.params.name  });
    res.json({  message: "Application deleted"  });
  } catch (error) {
    next(error);
  }
};