require("dotenv").config();
const express = require("express");
const { dbConnect } = require("./model");
const app = express();
const port = process.env.PORT;

const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
const optionRoutes = require("./routes/option");
const resultRoutes = require("./routes/result");

dbConnect();
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/option", optionRoutes);
app.use("/api/v1/result", resultRoutes);

app.get("/", (req, res) => {
    res.send(`Server is Running on Port - ${port}`)
})

app.use("*", (req, res) => {
    res.send("Invalid Method or Endpoint")
});



app.listen(port, () => {
    try {
        console.log(`Server is Up on Port - ${port}`)
    } catch (error) {
        console.log('error: ', error);
    }
})