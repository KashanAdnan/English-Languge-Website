var mongoose = require("mongoose");

var teacherSchema = new mongoose.Schema({
  teachusername: String,
  email: String,
  password : String,
  confPassword : String,
});

var TeachersUserModel = mongoose.model(
  "School Teachers Data Base",
  teacherSchema
);

module.exports = {
    TeachersUserModel: TeachersUserModel,
};
