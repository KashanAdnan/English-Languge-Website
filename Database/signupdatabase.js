var mongoose = require("mongoose");
mongoose.connect(
  ("mongodb+srv://kashan:kashan654321@cluster0.c6v8zv7.mongodb.net/?retryWrites=true&w=majority"),
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected", () => {
  console.log("Sign Up Mongoose Connected Succesfully !");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoos Finally Disconnected Ther Is'nt any Network");
  process.exit(1);
});

var userSchema = new mongoose.Schema({
  username : String,
  email : String,
  phone : Number,
  password : String,
  confPassword : String
});
var SignUpUserModel = mongoose.model("School Sign Up Data Base", userSchema);

module.exports = {
    SignUpUserModel : SignUpUserModel
}
