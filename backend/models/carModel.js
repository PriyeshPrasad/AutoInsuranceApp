import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: {type: String, required: true},
    year: {type: String, required: true},
    model: {type: String, required: true},
    body: {type: String, required: true},
    condition: {type: String, required: true},
    milage: {type: Number, required: true},
    ownership: {type: String, required: true},
    vehicleUse: {type: String, required: true},
    modified: {type: Boolean, required: true},
    trackingEnabled: {type: Boolean, required: true},
    winterTiresIncluded: {type: Boolean, required: true},
    parkingType: {type: String, required: true},
    annualKMs: {type: Number, required: true},
    oneWayCommute: {type: Number, required: true},
    vehicleAcquisitionDate: {type: Date, required: true},
    insured: { type: mongoose.Schema.Types.ObjectId, ref: 'insured' },
    
})

const carModel = mongoose.models.car || mongoose.model("car", carSchema)

export default carModel;