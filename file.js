require("dotenv").config()
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const path = require("path");
const { UserModel } = require("./model/user");
const cookieParser = require("cookie-parser")
const { AdmissionModel } = require("./model/admission");
const connectDatabase = require("./connection/database.connect");
const app = express()

connectDatabase(process.env.MONGODB_URI)
app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(path.join(__dirname, "public"))));

app.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password, confirm_password } = req.body;
        const isUser = await UserModel.findOne({ email })
        if (isUser) {
            res.status(400).send({
                succes: false,
                message: "Email Already Exits!"
            })
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new UserModel({
            name,
            email,
            phone,
            password: hashedPassword,
            confirm_password: hashedPassword
        })
        var token = jwt.sign(
            {
                id: user._id
            },
            "hIHkthjUhuvfhuiyvnjy7yii9trefhon"
        );
        res.cookie("jToken", token, {
            maxAge: 86_400_000,
            httpOnly: true,
        });
        const UserDetails = await user.save()
        res.status(201).send({
            succes: true,
            message: "Registered Succesfully!",
            UserDetails
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            succes: false,
            message: error
        })
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await UserModel.findOne({ email });
        if (isUser) {
            const isMatch = await bcrypt.compare(password, isUser.password);
            if (isMatch) {
                var token = jwt.sign(
                    {
                        id: isUser._id
                    },
                    "hIHkthjUhuvfhuiyvnjy7yii9trefhon"
                );
                res.cookie("jToken", token, {
                    maxAge: 86_400_000,
                    httpOnly: true,
                });
                res.status(200).send({
                    succes: false,
                    message: "Login Succesfull!"
                })
            } else {
                res.status(400).send({
                    succes: false,
                    message: "Invalid Details Please Try Again!"
                })
            }
        } else {
            res.status(400).send({
                succes: false,
                message: "Invalid Invalid Details Please Try Again!"
            })
        }
    } catch (error) {
        res.status(500).send({
            succes: false,
            messsage: error.message
        })
    }
})

app.post('/admission', async (req, res) => {
    try {
        const { student_name, email, contact_no, adress, nationality, place_of_birth, level } = req.body;
        const isUser = await AdmissionModel.findOne({ email })
        if (isUser) {
            res.status(400).send({
                succes: false,
                message: "Email Already Exits !"
            })
            return;
        }
        const admission = new AdmissionModel({
            student_name,
            email,
            contact_no,
            adress,
            nationality,
            place_of_birth,
            level
        })

        const admissionDetails = await admission.save()
        res.status(200).send({
            succes: true,
            message: "Admission Succesfully!",
            admissionDetails
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

app.get("/admission", async (req, res) => {
    try {
        const data = await AdmissionModel.find({})
        res.status(200).send({
            succes: true,
            data
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

app.get("/users", async (req, res) => {
    try {
        const data = await UserModel.find({})
        res.status(200).send({
            succes: true,
            data
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

app.get("/me", async (req, res) => {
    try {
        const { jToken } = req.cookies;
        console.log(jToken);
        jwt.verify(jToken, "hIHkthjUhuvfhuiyvnjy7yii9trefhon",async function (err, decoded) {
            if (decoded) {
                console.log(decoded);
                const user = await UserModel.findOne({ _id: decoded.id });
                res.status(200).send({
                    success: true,
                    user
                })
            } else {
                console.log(err);
            }
        });
    } catch (error) {
        res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

app.get("/logout", async (req, res) => {
    try {
        req.cookies.jToken = ""
        res.status(200).send({
            succes: true,
            message: "Logout Succesfully!"
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

app.use((req, res, next) => {
    if (!req.cookies.jToken) {
        res.status(401).send({
            message: "invalid token!",
        });
        return;
    }
    jwt.verify(
        req.cookies.jToken,
        "hIHkthjUhuvfhuiyvnjy7yii9trefhon",
        (err, decodeData) => {
            if (decodeData) {

            } else {
                res.status(401).send({
                    message: "invalid token",
                });
            }
        }
    );
});


app.listen(3000, () => {
    console.log(`Server is Running on ${3000}`);
})