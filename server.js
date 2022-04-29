const express = require('express');
const dotenv= require("dotenv");
const  connectDB = require("./config/db.js");
const path = require("path");

const userRoutes = require("./routes/userRoutes.js");
const courseRoutes=  require("./routes/courseRoutes.js")
const myCoursesRoutes = require("./routes/myCoursesRoutes.js");

const { errorHandler, notFound }= require("./middleware/errorMiddleware.js");

dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userCourses",myCoursesRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);