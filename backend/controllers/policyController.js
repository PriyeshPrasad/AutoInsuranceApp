import { mongoose } from 'mongoose';
import carModel from '../models/carModel.js'
import insuredModel from '../models/insuredModel.js'
import quoteModel from '../models/quoteModel.js';
import axios from 'axios';


//Submit Policy Data

export const submitPolicy = async (req, res) => {

    const { insured, cars, effectivePolicyDate } = req.body;
    try {
        //Save Insured Details
        const insuredData = await insuredModel.create(insured);

        //Save Cars Details
        const carDocs = await Promise.all(
            cars.map(car => carModel.create({ ...car, insured: insuredData._id }))
        )

        //Create Quote
        const quoteNumber = `Q${new String(Math.floor(10000000 + Math.random() * 90000000))}`

        const quoteData = await quoteModel.create({
            quoteNumber: quoteNumber,
            effectivePolicyDate: effectivePolicyDate,
            insured: insuredData._id,
            cars: carDocs.map(car => car._id)
        })

        res.status(200).json({
            success: true,
            message: `Policy data saved successfully. Your Quote number is ${quoteData.quoteNumber}`
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Update policy Data

export const updatePolicy = async (req, res) => {
    try {
        const { quote, insured, cars, effectivePolicyDate } = req.body;

        // Check if quote is not null, undefined, or empty string
        if (!quote || quote.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Quote is invalid"
            })
        }
        else {
            // Get quote from DB
            const policy = await quoteModel.aggregate([
                {
                    $match: {
                        quoteNumber: quote
                    }
                },
                {
                    $lookup: {
                        from: "insureds",
                        localField: "insured",
                        foreignField: "_id",
                        as: "insuredDetails"
                    }
                },
                {
                    $lookup: {
                        from: "cars",
                        localField: "cars",
                        foreignField: "_id",
                        as: "carDetails"
                    }
                }
            ])
            if (policy.length === 0) {
                return res.status("400").json({
                    success: true,
                    message: policy
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: policy
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Get Car All Make

export const getCarMake = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BACK4APP_URI}/Car_Model_List?limit=1000000&keys=Make`, {
            headers: {
                'X-Parse-Application-Id': process.env.BACK4APP_APPID, // This is the fake app's application id
                'X-Parse-Master-Key': process.env.BACK4APP_MASTERKEY, // This is the fake app's readonly master key
            }
        })

        const carMake = [...new Set(response.data.results.map(car => car.Make))]
        return res.status(200).json({
            success: true,
            data: carMake
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Get Car Year, Model and Body(Category) based on Make

export const getCarData = async (req, res) => {
    const { make } = req.body
    try {
        if (make) {
            const response = await axios.get(`${process.env.BACK4APP_URI}/Car_Model_List_${make}?limit=1000000`, {
                headers: {
                    'X-Parse-Application-Id': process.env.BACK4APP_APPID, // This is the fake app's application id
                    'X-Parse-Master-Key': process.env.BACK4APP_MASTERKEY, // This is the fake app's readonly master key
                }
            });
            const carDetailedData = response.data.results.map(cdata => ({
                Make: cdata.Make,
                Year: cdata.Year,
                Model: cdata.Model,
                Category: cdata.Category
            }))
            return res.status(200).json({
                success: true,
                data: carDetailedData
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "valid make is required"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

