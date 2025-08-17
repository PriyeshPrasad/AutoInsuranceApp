import React from 'react'

function InsuredForm() {
    return (
        <div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Insured's First Name</label>
                <input type="text" id="firstName" name="firstName" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="First Name" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Insured's Last Name</label>
                <input type="text" id="lastName" name="lastName" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Last Name" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Date of birth</label>
                <input type="text" id="dateOfBirth" name="dateOfBirth" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Date of birth" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Employment Status</label>
                <input type="text" id="employmentStatus" name="employmentStatus" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Employment Status" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Current License</label>
                <input type="text" id="currentLicence" name="currentLicence" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Current License" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Age when received first licence</label>
                <input type="text" id="ageWhenAcquiredLicence" name="ageWhenAcquiredLicence" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Age when received first licence" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Driving Training Certficate completed?</label>
                <input type="text" id="validTrainingCertificate" name="validTrainingCertificate" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Driving Training Certficate completed?" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Licence suspended?</label>
                <input type="text" id="licenceSuspended" name="licenceSuspended" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Licence suspended?" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Any convictions in past 3 years?</label>
                <input type="text" id="past3YrsConvictions" name="past3YrsConvictions" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Any convictions in past 3 years?" />
            </div>
        </div>
    )
}

export default InsuredForm;
