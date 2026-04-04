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


exports.getAllVendors = async(req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const vendors = await VendorService.getallvendors(page, limit);

        return res.status(200).json({
            success: true,
            message: "Vendors fetch successfully",
            data: vendors,
        });
    } catch (error) {
        console.log(error.message)
    }
};


exports.getVendorById = async (req, res , next ) => {
    try {
        const vendor = await VendorService.getVendorById(req.params.id);

        res.status(200).json({
            success: true,
            data: vendor
        });
    } catch (error) {
        next(error);
    }
}


exports.updateVendor = async (req, res, next) => {
    try {
        const vendor = await VendorService.updateVendor(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Vendor updated successfully",
            data: vendor
        })
    } catch (error) {
        next (error);
    }
}

exports.deleteVendor = async (req, res, next) => {
    try {
        await VendorService.deleteVendor(req.params.id);

        res.status(200).json({
            success: true,
            message: "Vendor deleted succssfully"
        });
    } catch (error) {
        next(error);
    }
}

