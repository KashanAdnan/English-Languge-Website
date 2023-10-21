var mongoose = require("mongoose");

var contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email : String,
  messgae : String,
});
var ContactUserModel = mongoose.model(
  "School Contact Data Base",
  contactSchema
);

module.exports = {
    ContactUserModel: ContactUserModel,
};
