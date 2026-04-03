const VendorService = require("../services/vendor.service");

exports.createVendor = async (req, res , next) => {
    try {
        const vendor = await VendorService.createVendor(req.body);

        return res.status(201).json({
            success: true,
            message: "Vendor created Successfully",
            data: vendor,
        });
    } catch (error) {
        next(error)
    }
};


exports.getAllVendors = async(req, res ) => {
    try {
        const vendors = await VendorService.getallvendors();

        return res.status(200).json({
            success: true,
            message: "Vendors fetch successfully",
            data: vendors,
        });
    } catch (error) {
        console.log(error.message)
    }
}