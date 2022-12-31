var mongoose = require("mongoose");
mongoose.connect(
  ("mongodb+srv://kashan:kashan654321@cluster0.c6v8zv7.mongodb.net/?retryWrites=true&w=majority"),
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected", () => {
  console.log("Description Mongoose Connected Succesfully !");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoos Finally Disconnected Ther Is'nt any Network");
  process.exit(1);
});

var DescriptionSchema = new mongoose.Schema({
  desc : String,
  paradesc : String,
  date : String,
});
var DescModel = mongoose.model("Desc", DescriptionSchema);

module.exports = {
    DescModel : DescModel
}
