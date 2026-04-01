const Package = require("../models/Package.model");


const createPackage = async (data) => {
  const newPackage = new Package(data);
  return await newPackage.save();
};

const getAllPackages = async () => {
  return await Package.find();
};

const getPackageById = async (id) => {
  return await Package.findById(id);
};

const updatePackage = async (id, data) => {
  return await Package.findByIdAndUpdate(id, data, { new: true });
};

const deletePackage = async (id) => {
  return await Package.findByIdAndDelete(id);
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage
};