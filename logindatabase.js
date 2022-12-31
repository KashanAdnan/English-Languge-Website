var mongoose = require("mongoose");
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Login Mongoose Connected Succesfully !");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoos Finally Disconnected Ther Is'nt any Network");
  process.exit(1);
});

var loginSchema = new mongoose.Schema({
  email: String,
  password: String,
});
var LoginUserModel = mongoose.model("School Login Data Base", loginSchema);

module.exports = {
  LoginUserModel: LoginUserModel,
};
