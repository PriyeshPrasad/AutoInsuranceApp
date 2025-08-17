import React from 'react';

function PolicyInfo() {
    return (
        <div>
            <div className=''>
                <label className="block text-gray-700 font-medium mb-1">Effective Policy Date</label>
                <input type="text" id="effectivePolicyDate" name="effectivePolicyDate" className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" placeholder="Effective Policy Date" />
            </div>
        </div>
    )
}

export default PolicyInfo;
