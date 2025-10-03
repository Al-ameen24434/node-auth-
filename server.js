require("dotenv").config();

const express = require("express");
const connectDB = require("./database/db");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const uploadImageRotes = require("./routes/image-routes");

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", uploadImageRotes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
