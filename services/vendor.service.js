const Vendor = require("../models/Vendor");

const createVendor = async (data) => {
    return await Vendor.create(data);
};

const getallvendors = async () => {
    try {
        const vendors = await Vendor.find().sort({createdAt: -1});
        return vendors;
    } catch (error) {
        throw new Error("Error fetching vendors:" , error.message);
    }
}


module.exports = {
    createVendor,
    getallvendors,
};