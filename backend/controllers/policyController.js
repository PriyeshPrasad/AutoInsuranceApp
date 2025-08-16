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

        //Calculate Premium
        const quotePremium = calculatePremium(insured, cars)

        const quoteData = await quoteModel.create({
            quoteNumber: quoteNumber,
            effectivePolicyDate: effectivePolicyDate,
            insured: insuredData._id,
            cars: carDocs.map(car => car._id),
            premium: quotePremium
        })

        

        res.status(200).json({
            success: true,
            message: `Policy data saved successfully. Your Quote number is ${quoteData.quoteNumber}`,
            MonthylyPremium: quotePremium
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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { quote, insured, cars, effectivePolicyDate } = req.body;

        // Check if quote is not null, undefined, or empty string
        if (!quote || quote.trim() === "") {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                message: "Quote is invalid"
            })
        }
        else {
            // Get quote from DB

            const quoteRecord = await quoteModel.findOne({quoteNumber: quote}).session(session);
            if (!quoteRecord) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    success: false,
                    message: `No policy found with quote number : ${quote}`
                })
            }
            else {
                //if quote details found then update policy
                let updateInsured = null;
                if (!insured && !cars && !effectivePolicyDate) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(400).json({
                        success: false,
                        message: "Nothing to update"
                    })
                }
                else {
                    const insuredRecord = await insuredModel.findById(insured._id)
                    if (!insuredRecord) {
                        await session.abortTransaction();
                        session.endSession();
                        return res.status(400).json({
                            success: false,
                            message: "Insured record not found"
                        })
                    }
                    else {
                        updateInsured = await insuredModel.findByIdAndUpdate(
                            insured._id,
                            insured,
                            {
                                new: true,
                                session
                            }
                        )
                    }
                    const newCarDocs = []
                    if (cars && cars.length > 0) {
                        //cars.forEach(async car => {
                            for(const car of cars){
                            const carRecord = await carModel.findById(car._id)
                            if (carRecord) {
                                const updatedCar = await carModel.findByIdAndUpdate(
                                    car._id,
                                    car,
                                    {
                                        new : true,
                                        session
                                    }
                                )
                                newCarDocs.push(updatedCar._id)
                            }
                            else {
                                const newCar = await carModel.create([{...car, insured: updateInsured._id}], {session})
                                newCarDocs.push(newCar[0]._id);
                            }
                        }
                        //});
                    }

                    quoteRecord.cars = newCarDocs;
                    quoteRecord.insured = updateInsured;
                    quoteRecord.effectivePolicyDate = effectivePolicyDate;

                    //Revise Premium
                    const quotePremium = calculatePremium(updateInsured, newCarDocs)
                    quoteRecord.premium = quotePremium;

                    await quoteRecord.save()
                    await session.commitTransaction();
                    session.endSession();
                    return res.status(200).json({
                        success: true,
                        message: "Quote updated successfully"
                    })
                }
            }
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
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

function calculatePremium(insured, cars) {
    const BASE_PREMIUM = 500;
    let totalPremium = 0;

    // --- Driver Risk Factors ---
    let driverSurcharge = 0;
    const age = calculateAge(new Date(insured.dateOfBirth), new Date(Date.now()));

    // Age Factor
    if (age < 25) {
        driverSurcharge += 300; // Young driver surcharge
    } else if (age >= 65) {
        driverSurcharge += 100; // Senior driver surcharge
    }

    // License Type Factor
    switch (insured.currentLicence) {
        case "G1":
            driverSurcharge += 500;
            break;
        case "G2":
            driverSurcharge += 250;
            break;
        default: // G or full license
            // No surcharge
            break;
    }

    // Driving History
    if (insured.licenceSuspended || insured.past3YrsConvictions) {
        driverSurcharge += 500;
    }
    if (insured.validTrainingCertificate) {
        driverSurcharge -= 50;
    }

    // --- Vehicle-specific Factors ---
    const luxuryCars = ["Audi", "BMW", "Lexus", "Acura", "Bentley", "Ferrari", "Jaguar", "Lincoln", "Tesla", "Maserati", "McLaren"];
    const midLuxuryCars = ["Chrysler", "Cadillac", "Buick", "INFINITI"];

    cars.forEach(car => {
        let carSurcharge = 0;

        // Make and Model
        if (luxuryCars.includes(car.make)) {
            carSurcharge += 400;
        } else if (midLuxuryCars.includes(car.make)) {
            carSurcharge += 200;
        }

        // Vehicle Age
        const currentYear = new Date().getFullYear();
        if (parseInt(car.year) > currentYear - 3) {
            carSurcharge += 150; // Surcharge for new cars
        }

        // Condition & Mileage
        if (car.condition === "Used" && car.milage > 50000) {
            carSurcharge += 50;
        }

        // Ownership
        if (car.ownership === "Leased") {
            carSurcharge += 75; // Leased cars often have higher premiums
        }

        // Usage and Mileage
        if (car.vehicleUse === "Business") {
            carSurcharge += 250;
        }
        if (car.annualKMs > 20000) {
            carSurcharge += 100;
        }

        // Modifications
        if (car.modified) {
            carSurcharge += 300; // Surcharge for modifications
        }

        // Discounts
        if (car.trackingEnabled) {
            carSurcharge -= 50;
        }
        if (car.winterTiresIncluded) {
            carSurcharge -= 25;
        }
        if (car.parkingType === "Garage") {
            carSurcharge -= 75;
        } else if (car.parkingType === "Underground Parking") {
            carSurcharge -= 50;
        }

        // Add the combined premiums for this car to the total
        totalPremium += BASE_PREMIUM + driverSurcharge + carSurcharge;
    });

    // Multi-car discount
    if (cars.length > 1) {
        totalPremium *= 0.9; // 10% multi-car discount
    }

    return totalPremium;
}
function calculateAge(startDate, endDate) {
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  const ageDate = new Date(diffInMilliseconds);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  // Check if the anniversary has occurred this year
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  if (endMonth < startMonth || (endMonth === startMonth && endDay < startDay)) {
    return age - 1;
  }

  return age;
}

