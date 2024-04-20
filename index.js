require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Specify multiple origins in an array
const allowedOrigins = [
  "http://localhost:5173",
  "http://http://localhost:4000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      //Allow requests with no origin  (like module apps or curl request)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS polisy for this site does not allow access from the specific Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["Get", "Post", "Put", "Delete"],
    allowedHeaders: ["content-type", "Authorization"],
  })
);

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
//connect to mongodb database
const dbURI = process.env.MONGO_DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected.....✅ ");
  } catch (err) {
    console.error("Error connecting to MongoDB ❌:", err, err.message);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

// import Routes from the Routes folder
const registerUserRoute = require("./src/routes/registerUserRoute");
const loginUserRoute = require("./src/routes/loginRoute");
const getUserDataRoute = require("./src/routes/getUserDataRoute");
const saveMsgRoute = require("./src/routes/saveMsgRoute");
const getChatsRoute = require("./src/routes/getChatsRoute");

// use Route
app.use("/api", registerUserRoute);
app.use("/api", loginUserRoute);
app.use("/api", getUserDataRoute);
app.use("/api", saveMsgRoute);
app.use("/api", getChatsRoute);

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`serve runing on port http://localhost:${PORT}`)
  );
});
