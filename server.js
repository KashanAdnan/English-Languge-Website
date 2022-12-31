// Requiring All  Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const bycrypt = require("bcryptjs");
const axios = require("axios");
const jwt = require("jsonwebtoken");

// Databases Requires
const { SignUpUserModel } = require("./signupdatabase");
const { AdmissionUserModel } = require("./admissiondatbase");
const { DescModel } = require("./descdatabase");

// Calling express
const app = express();

// Express Uses
app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Conecting to Front End
app.use("/", express.static(path.resolve(path.join(__dirname, "public"))));

// Sign Up POST Request

app.post("/signUp", (req, res, next) => {
  // Model Of The Database finding one Of them Matchby email
  SignUpUserModel.findOne({ email: req.body.email }, (err, data) => {
    if (err || data) {
      // Making Satment for Email Cannot Match
      if (data.email === req.body.email) {
        //Sending Message to Fornt End With Status  Of 409
        res.status(409).send({
          message: "Please Make Another Account User Already Exists !",
        });
        return;
      }
    } else {
      // Using Bcryptjs for Generating a HASH Password
      // Generating Salts For HASH password
      const saltRounds = 12;
      bycrypt.genSalt(saltRounds, function (err, salt) {
        bycrypt.hash(req.body.password, salt, function (err, hash) {
          // Making The Schema for Getting All Information From The  Front  End and save it
          const newSignUpPerson = SignUpUserModel({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            confPassword: hash,
          });
          // Saving Sign Up User to The Data Base
          newSignUpPerson.save((err, data) => {
            if (!err) {
              // Sending Message to Fornt End With Status  Of 200
              res.status(200).send({
                message: "Sign Up SuccesFull !",
                data,
              });
            } else {
              res.status(405).send({
                // Sending Message to Fornt End With Status  Of 405
                message: "User creation Failed",
              });
            }
          });
        });
      });
    }
  });
});

// Making Login POST Request

app.post("/logIn", (req, res, next) => {
  SignUpUserModel.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      if (data.email === req.body.email) {
        // Breaking The HASH  Password For Checking The User Is Valid or Not Valid by comparing the old password to the req.body.password
        bycrypt.compare(req.body.password, data.password, (err, isFound) => {
          if (isFound) {
            const token = jwt.sign(
              {
                email: req.body.email,
                password: req.body.password,
              },
              "hIHkthjUhuvfhuiyvnjy7yii9trefhon",
              (err, token) => {
                console.log(token);
              }
            );
            //Sending Message to Fornt End With Status  Of 200
            res.status(200).send({
              data: data.username + "  Welcome To Our Website ! ",
            });
          } else {
            //Sending Message to Fornt End With Status  Of 405
            res.status(405).send({
              message: "The Password Is Incorrect  !",
            });
          }
        });
      } else {
        //Sending Message to Fornt End With Status  Of 405
        res.status(405).send({
          message: "Password is Incorrect !",
        });
      }
    } else if (
      req.body.email === "admin@gmail.com" &&
      req.body.password === "admin"
    ) {
      //Sending Message to Fornt End With Status  Of 201
      res.status(201).send({
        message: "Syed Tariq Ahmed  Admin Welcome To Admin Page !",
      });
    } else {
      //Sending Message to Fornt End With Status  Of 405
      res.status(405).send({
        message: "Email is Inccorect !",
      });
    }
  });
});

// Making  The Admission POST Request For Adding Student

app.post("/Admission", (req, res, next) => {
  AdmissionUserModel.findOne({ email: req.body.email }, (err, data) => {
    if (err || data) {
      if (data.email === req.body.email) {
        //Sending Message to Fornt End With Status  Of 405
        res.status(405).send({
          message: "User Already Exists Please Make Another Email ID !",
        });
      }
    } else {
      const newAdmissionPerson = AdmissionUserModel({
        // Making The Schema for Getting All Information From The  Front  End and save it
        stDname: req.body.stDname,
        age: req.body.age,
        email: req.body.email,
        contactno: req.body.contactno,
        adress: req.body.adress,
        nationality: req.body.nationality,
        placeofBIrth: req.body.placeofBIrth,
        level: req.body.level,
      });
      // Saving Sign Up User to The Data Base
      newAdmissionPerson.save((err, data) => {
        if (!err) {
          //Sending Message to Fornt End With Status  Of 405
          res.status(200).send({
            message: "Your Form Has Been Submitted  !",
            data,
          });
        } else {
          //Sending Message to Fornt End With Status  Of 405
          res.status(405).send({
            message: "User creation Failed",
          });
        }
      });
    }
  });
});

// Making Get Requests for getting all data from Database

app.get("/descdata", (req, res) => {
  // Finding all DATA from Database
  const data = DescModel.find({}, (err, data) => {
    if (err) {
      // Sending Error If error
      res.send(err);
    } else {
      // Sending Data to the Front End
      res.send(data);
    }
  });
});

app.get("/admin", (req, res) => {
  // Finding all DATA from Database
  const data = SignUpUserModel.find({}, (err, data) => {
    if (err) {
      // Sending Error If error
      res.send(err);
    } else {
      // Sending Data to the Front End
      res.send(data);
    }
  });
});

app.get("/signupdata", (req, res) => {
  // Finding all DATA from Database
  const data = AdmissionUserModel.find({}, (err, data) => {
    if (err) {
      // Sending Error If error
      res.send(err);
    } else {
      // Sending Data to the Front End
      res.send(data);
    }
  });
});

// Making Delete Request For Deleting data From Database

app.delete("/delete/:id", (req, res) => {
  SignUpUserModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        message: "Refresh Your Page !",
      });
    } else {
      res.status(500).send({
        message: "error",
        err,
      });
    }
  });
});

app.put("/update/:id", (req, res) => {
  AdmissionUserModel.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        stDname: req.body.stDname ,
        email: req.body.email,
        contactno: req.body.contactno,
        level: req.body.level,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        message: "User Updated !",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
});
app.delete("/admidelete/:id", (req, res) => {
  AdmissionUserModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).send({
        message: "Refresh Your Page !",
      });
    } else {
      res.status(500).send({
        message: "error",
        err,
      });
    }
  });
});

app.put("/admiupdate/:id", (req, res) => {
  AdmissionUserModel.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        stDname: req.body.stDname,
        email: req.body.email,
        contactno: req.body.contactno,
        adress: req.body.adress,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        message: "User Updated !",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
});

app.post("/desc", (req, res, next) => {
  const newDesc = DescModel({
    desc: req.body.desc,
    paradesc: req.body.paradesc,
    date: req.body.date,
  });
  newDesc.save((err, data) => {
    if (!err) {
      res.status(200).send({
        message: "You Description Has Send To the Page  !",
        data,
      });
    } else {
      res.status(405).send({
        message: "Could'nt Send Description",
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server is Running On PORT Number : ", port);
});
