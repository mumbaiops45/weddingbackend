const PaymentService = require("../services/payment.service");

exports.createPayment = async (req, res , next) => {
    try {
        const payment = await PaymentService.createPayment(req.body);

        return res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllPayments = async(req, res) => {
    try {
        const payments = await PaymentService.getAllPayments();

        return res.status(200).json({
            success: true,
            message: "Payments fetched successfully",
            data: payments
        });
    } catch (error) {
            res.status(500).json({ success: false, message: error.message });

    }
}

exports.getPayment = async (req, res) => {
    try {
        const payment = await PaymentService.getPaymentById(req.params.id);

        if(!payment){
            return res.status(404).json({success: false, message: "Payment not found"});
        }

        return res.status(200).json({
            success: true,
            data: payment
        });
    } catch (error) {
            res.status(500).json({ success: false, message: error.message });
    }
}

exports.updatePayment = async (req, res) => {
    try {
        const payment = await PaymentService.updatePayment(req.params.id , req.body);

         if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment
    });
    } catch (error) {
          res.status(400).json({ success: false, message: error.message });
  
    }
}


exports.softDeletePayment = async (req,res) => {
    try {
        const payment = await PaymentService.softDeletePayment(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Payment deleted successfully ",
            data: payment
        });
    } catch (error) {

        if(error.message === "Payment not found"){
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        if(error.message === "Payment is already deleted"){
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({success: false, message: error.message});
    }
}

exports.restorePayment = async (req, res) => {
    try {
        const payment = await PaymentService.restorePayment(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Payment restored successfully",
            data: payment
        });
    } catch (error) {

        if(error.message === "Payment not found"){
            return res.status(404).json({
                    success: false,
                    message: error.message
            })
        }

        if(error.message === "Payment is already active"){
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({success: false, message: error.message});
    }
};


exports.getDeletedPayments = async (req, res) => {
    try {
        const payments = await PaymentService.getDeletedPayments();

        return res.status(200).json({
            success: true,
            message: "Deleted payments fetched successfully",
            data: payments
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


exports.hardDeletePayment = async (req, res) =>{
    try {
        const payment = await PaymentService.hardDeletePayment(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Payment permantly deleted successfully"
        });
    } catch (error) {
        if(error.message === "Payment not found or not soft-deleted "){
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({success: false, message: error.message});
    }
};