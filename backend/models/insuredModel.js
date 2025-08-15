import mongoose from "mongoose";

const insuredSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    employmentStatus: {type: String, required: true},
    currentLicence: {type: Boolean, required: true},
    ageWhenAcquiredLicence: {type: Number, required: true},
    validTrainingCertificate: {type: Boolean, required: true},
    licenceSuspended: {type: Boolean, required: true},
    past3YrsConvictions: {type: Boolean, required: true}
})


const insuredModel = mongoose.models.insured || mongoose.model("insured", insuredSchema)

export default insuredModel;