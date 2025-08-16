import mongoose from "mongoose";

const quoteModelSchema = new mongoose.Schema({
    quoteNumber : {type: String, required: true},
    effectivePolicyDate: {type: Date, required: true},
    insured: { type: mongoose.Schema.Types.ObjectId, ref: 'insured' },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'car' }],
    premium: {type: Number}

})

const quoteModel = mongoose.models.quote || mongoose.model("quote", quoteModelSchema)

export default quoteModel;