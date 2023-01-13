var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kashan:kashan654321@cluster0.c6v8zv7.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected", () => {
  console.log("Contact Mongoose Connected Succesfully !");
});

mongoose.connection.on("disconnected", () => {
  console.log("Teachers Finally Disconnected Ther Is'nt any Network");
  process.exit(1);
});

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
