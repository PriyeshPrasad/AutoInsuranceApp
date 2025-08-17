import React from 'react'

function VehicleForm() {
    return (
        <div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Vehicle's Make</label>
                <input type="text" id="make" name="make" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Make" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Vehicle's Year</label>
                <input type="text" id="year" name="year" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Year" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Model</label>
                <input type="text" id="model" name="model" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Model" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Body</label>
                <input type="text" id="body" name="body" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Body" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Condition</label>
                <input type="text" id="condition" name="condition" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Condition" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Milage</label>
                <input type="text" id="milage" name="milage" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Milage" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Ownership</label>
                <input type="text" id="ownership" name="ownership" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Ownership" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Usage</label>
                <input type="text" id="usage" name="usgae" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Usage" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Modified</label>
                <input type="text" id="modified" name="modified" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Modified" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Tracking Enabled</label>
                <input type="text" id="trackingEnabled" name="trackingEnabled" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Tracking Enabled" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Winter Types Included</label>
                <input type="text" id="winterTiresIncluded" name="winterTiresIncluded" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Winter Types Included" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Parking Type</label>
                <input type="text" id="parkingType" name="parkingType" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Parking Type" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Expected Annual KMs</label>
                <input type="text" id="annualKMs" name="annualKMs" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Expected Annual KMs" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Vehicle Purchase Date</label>
                <input type="text" id="vehicleAcquisitionDate" name="vehicleAcquisitionDate" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Vehicle Purchase Date" />
            </div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Daily KMs to commute to work/school(one way)</label>
                <input type="text" id="oneWayCommute" name="oneWayCommute" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Daily Commute KMs" />
            </div>
        </div>
    )
}

export default VehicleForm;
