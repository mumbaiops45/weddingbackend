const packageService = require("../services/package.service");


const createPackage = async (req, res) => {
  try {
    const pkg = await packageService.createPackage(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getPackages = async (req, res) => {
  try {
    const packages = await packageService.getAllPackages();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getPackage = async (req, res) => {
  try {
    const pkg = await packageService.getPackageById(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updatePackage = async (req, res) => {
  try {
    const pkg = await packageService.updatePackage(req.params.id, req.body);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    const pkg = await packageService.deletePackage(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage
};