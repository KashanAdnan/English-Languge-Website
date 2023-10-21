const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    place_of_birth: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
});

const AdmissionModel = mongoose.model("AdmissionDatabase", admissionSchema);

module.exports = {
    AdmissionModel: AdmissionModel
}
