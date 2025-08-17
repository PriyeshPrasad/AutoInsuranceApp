import React, { useState } from 'react'
import VehicleForm from './VehicleForm';
import InsuredForm from './InsuredForm';
import PolicyInfo from './PolicyInfo';

function QuoteForm() {
    const [step, setStep] = useState(0);
    const formTitles = ["Vehicle Form", "Insured Form", "Policy Form"];

    const nextStep = () => {
        setStep((counter) => counter + 1)
    }
    const prevStep = () => {
        setStep((counter) => counter - 1)
    }

    const DisplayPage = () => {
        if (step === 0) {
            return <VehicleForm />
        }
        else if (step === 1) {
            return <InsuredForm />
        }
        else {
            return <PolicyInfo />
        }
    }

    return (
        <div>
            <div className='form-step space-y-6 mt-20 w-[600px] mx-auto'>

                <div className=''>
                    <h1 className='text-2xl font-semibold text-gray-700 mb-4'>{formTitles[step]}</h1>
                </div>
                <div className='form-step space-y-6'>
                    {DisplayPage()}
                </div>
                <div className='flex justify-between mt-10 gap-x-10'>
                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium shadow-md transition-all duration-200 ease-in-out transform hover:scale-105' disabled={step === 0} onClick={prevStep}>Prev</button>
                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium shadow-md transition-all duration-200 ease-in-out transform hover:scale-105' disabled={step === formTitles.length - 1} onClick={nextStep}>Next</button>
                </div>
            </div>

        </div>
    )
}

export default QuoteForm
