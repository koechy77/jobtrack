require("dotenv").config();
const connectDB = require("./config/db");

const app = require("./app");

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
