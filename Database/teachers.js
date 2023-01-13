var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kashan:kashan654321@cluster0.c6v8zv7.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected", () => {
  console.log("Teachers Mongoose Connected Succesfully !");
});

mongoose.connection.on("disconnected", () => {
  console.log("Teachers Finally Disconnected Ther Is'nt any Network");
  process.exit(1);
});

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
