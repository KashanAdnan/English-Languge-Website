var mongoose = require("mongoose");

var DescriptionSchema = new mongoose.Schema({
  desc : String,
  paradesc : String,
  date : String,
});
var DescModel = mongoose.model("Desc", DescriptionSchema);

module.exports = {
    DescModel : DescModel
}
