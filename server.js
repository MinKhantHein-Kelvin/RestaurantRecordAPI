const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

//connect to Database
mongoose.connect(
  process.env.db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB is connected");
  }
);

app.use (express.static(__dirname + 'restaurantRecordsapplication/dist/restaurant-recordsapplication'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+ 'restaurantRecordsapplication/dist/restaurant-recordsapplication/index.html'));
})

// import route
const restaurantRoute = require("./routes/restaurant");
const userRoute = require("./routes/user")

//Middleware
app.use(express.json());
app.use(cors());


//Route Middleware
app.use("/api/restaurant", restaurantRoute);
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log("Server is running on Port 3000");
});
