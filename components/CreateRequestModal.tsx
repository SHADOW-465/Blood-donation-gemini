
import React, { useState } from 'react';
import { BloodType, DonationRequest, Urgency, RequestStatus } from '../types';

interface CreateRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (request: Omit<DonationRequest, 'id' | 'createdAt' | 'status' | 'distance'>) => void;
}

const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [bloodType, setBloodType] = useState<BloodType>(BloodType.A_POSITIVE);
    const [unitsNeeded, setUnitsNeeded] = useState('1');
    const [hospital, setHospital] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [urgency, setUrgency] = useState<Urgency>(Urgency.STANDARD);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest = {
            patientName,
            patientAge: parseInt(patientAge),
            bloodType,
            unitsNeeded: parseInt(unitsNeeded),
            hospital,
            contactNumber,
            urgency,
        };
        onSubmit(newRequest);
        onClose();
    };
    
    const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm";
    const labelClass = "block text-sm font-medium text-brand-gray-700";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-brand-gray-800">Create Emergency Request</h2>
                        <button onClick={onClose} className="text-brand-gray-400 hover:text-brand-gray-600">&times;</button>
                    </div>
                    <p className="mt-1 text-sm text-brand-gray-500">Please fill in the patient's details accurately.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 pt-0 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="patientName" className={labelClass}>Patient Name</label>
                            <input type="text" id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} className={inputClass} required />
                        </div>
                        <div>
                            <label htmlFor="patientAge" className={labelClass}>Patient Age</label>
                            <input type="number" id="patientAge" value={patientAge} onChange={e => setPatientAge(e.target.value)} className={inputClass} required min="0" />
                        </div>
                        <div>
                            <label htmlFor="bloodType" className={labelClass}>Blood Type</label>
                            <select id="bloodType" value={bloodType} onChange={e => setBloodType(e.target.value as BloodType)} className={inputClass} required>
                                {Object.values(BloodType).map(bt => <option key={bt} value={bt}>{bt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="unitsNeeded" className={labelClass}>Units Needed</label>
                            <input type="number" id="unitsNeeded" value={unitsNeeded} onChange={e => setUnitsNeeded(e.target.value)} className={inputClass} required min="1" />
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="hospital" className={labelClass}>Hospital</label>
                            <input type="text" id="hospital" value={hospital} onChange={e => setHospital(e.target.value)} className={inputClass} required />
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="contactNumber" className={labelClass}>Contact Number</label>
                            <input type="tel" id="contactNumber" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className={inputClass} required />
                        </div>
                        <div className="md:col-span-2">
                             <label className={labelClass}>Urgency</label>
                             <div className="mt-2 grid grid-cols-3 gap-3">
                                {Object.values(Urgency).map(u => (
                                    <button type="button" key={u} onClick={() => setUrgency(u)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${urgency === u ? 'bg-brand-red text-white shadow-md' : 'bg-brand-gray-100 text-brand-gray-600 hover:bg-brand-gray-200'}`}>
                                        {u}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-brand-gray-200 text-brand-gray-700 font-medium rounded-md hover:bg-brand-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-red text-white font-medium rounded-md hover:bg-brand-red-dark shadow-sm">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRequestModal;
