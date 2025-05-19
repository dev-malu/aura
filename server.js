const express = require("express");
const dotenv = require("dotenv");
const indexRoutes = require("./router/index");
const mongoose = require("mongoose");
const cors = require("cors");
const qs = require("qs");

dotenv.config();

const runServer = async () => {
  const app = express();

  app.use(cors({ origin: "http://localhost:5001" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("query parser", (str) => qs.parse(str));

  app.use("/api", indexRoutes);

  try {
    mongoose.connection.on("error", (error) => console.log(error));
    mongoose.connection.once("open", () =>
      console.log("Connected to mongoose")
    );

    await mongoose.connect(process.env.DATABASE_URL);
    const port = process.env.PORT || "3000";
    app.listen(port, () => {
      console.info(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

runServer();
