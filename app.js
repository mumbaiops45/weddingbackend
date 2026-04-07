const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const leadRoutes = require("./route/lead.route");
const userRoute = require("./route/user.route");
const packageRoutes = require("./route/package.route");
const vendorRouter = require("./route/vendor.routes");
const bookingRoutes = require("./route/booking.route");
const eventRoutes = require("./route/event.route");
const {errorHandler} = require("./utils/errorHandler");
const paymentRoute = require("./route/payment.route");

dotenv.config();


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());


app.use(cookieParser());


app.use("/", leadRoutes);
app.use("/", userRoute);
app.use("/vendor", vendorRouter);
app.use("/", bookingRoutes);
app.use("/", packageRoutes);
app.use("/events", eventRoutes);
app.use("/payment", paymentRoute);

app.use(errorHandler);



// main()
//   .then(() => console.log("Connection successful"))
//   .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/wedding');
// }


mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});