require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const listingsRoute = require("./routes/listings");
const applicationsRoute = require("./routes/applications");
const authRoute = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/resumes", express.static("public/resumes"));

app.use("/api/listings", listingsRoute);
app.use("/api/applications", applicationsRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => res.send("SarkariSaathi API चालू है"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB se connect ho gaya");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server chal raha hai port ${process.env.PORT || 5000} par`)
    );
  })
  .catch((err) => console.error("MongoDB connection fail:", err.message));
