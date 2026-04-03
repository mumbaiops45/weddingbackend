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
        const payments = await PaymentSErvice.getAllPayments();

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
        })
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


exports.deletePayment = async (req, res) => {
  try {
    const payment = await PaymentService.deletePayment(req.params.id);

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};