const Vendor = require("../models/vendor.model");

const createVendor = async (data) => {
    return await Vendor.create(data);
};

const getallvendors = async (page = 1, limit = 10) => {
   const skip = (page -1) * limit;

   return await Vendor.find()
   .sort({createdAt: -1})
   .skip(skip)
   .limit(limit);
}

const getVendorById = async (id) => {
    const vendor = await Vendor.findById(id);

    if(!vendor){
        throw new Error("Vendor not found");
    }
    return vendor;
}

const updateVendor = async (id, data) =>{
    const vendor = await Vendor.findByIdAndUpdate (id, data, {
        new: true,
        runValidators: true
    });

    if(!vendor){
        throw new Error("Vendor not found");
    }
    return vendor;
};

const deleteVendor = async (id) => {
    const vendor = await Vendor.findByIdAndDelete(id);
    if(!vendor){
        throw new Error("Vendor not found");
    }
    return vendor;
}

module.exports = {
    createVendor,
    getallvendors,
    getVendorById,
    updateVendor,
    deleteVendor

}; 