const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose');
const cors = require('cors');
const leadRoutes = require("./route/lead.route");


app.use(express.json());
app.use(cors());

main()
.then((res) => {
    console.log("Connection successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wedding');
}


app.use("/", leadRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
