const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require('cors')
const mongoose = require('mongoose')
const User = require("./models/user.js")
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("DB connected.");
})

const PORT = process.env.PORT || 3000


app.listen(PORT, () => console.log(`Server is Running on PORT: ${PORT}`))


// ============= Views =========================================

app.get("/", async (req, res) => {
    const allUsers = await User.find({})
    res.render("home.ejs", { allUsers })
})







// =============== APIs ============================================

app.get("/api/users", async (req, res) => {
    const allUsers = await User.find({})
    res.status(200).json(allUsers);
})

app.get("/users", async (req, res) => {
    res.render("user.ejs");
})

app.post("/api/users/create", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
    const { fname, lname, dob, city, mobileNumber } = req.body
    // console.log(req.body)
    const newUser = new User({ fname, lname, dob, city, mobileNumber })
    await newUser.save();
    res.redirect("/");
})


app.delete("/api/users/delete/:_id", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
    const _id = req.params._id
    console.log(_id);
    const user = await User.find({ _id })
    await user.delete();
    res.redirect("/")
})

app.post("/api/users/update", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
    const { _id, fname, lname, dob, city, mobileNumber } = req.body
    const filter = { _id };
    const update = { fname, lname, dob, city, mobileNumber };
    const user = await User.findOneAndUpdate(filter, update, { new: true });
    user.save().then(user => res.status(200).json(user)).catch(err => res.status(400).json("Error! " + err))
})

