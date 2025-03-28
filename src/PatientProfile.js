import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/PatientProfile.css';

const PatientProfile = ({ username }) => {
    const [formData, setFormData] = useState(null); // Start with null
    const [donation, setDonation] = useState(''); // Separate donation state
    const [error, setError] = useState(null);
    const [hasDonated, setHasDonated] = useState(false); // Track donation status

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`https://ai-powered-emergency-health-network-server.vercel.app/patient-profile/api/patient/${username}`);
                const reportData = response.data?.report || {};
                setFormData(reportData);
                setDonation(response.data?.donation || ''); // Fetch donation separately
                setHasDonated(response.data?.donation !== undefined); // Check donation status
            } catch (error) {
                setError('Failed to fetch patient data');
            }
        };
        fetchPatientData();
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDonationChange = (e) => {
        setDonation(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://ai-powered-emergency-health-network-server.vercel.app/patient-profile/api/patient/${username}`, {
                report: formData,
                donation,
            });
            alert('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    const handleRemoveDonation = async () => {
        try {
            await axios.delete(`https://ai-powered-emergency-health-network-server.vercel.app/patient-profile/api/patient/${username}/donation`);
            setHasDonated(false);
            setDonation('');
            alert('Donation status removed successfully!');
        } catch (error) {
            setError('Failed to update donation status');
        }
    };

    if (error) return <div className="error">{error}</div>;
    if (!formData) return <div>Loading...</div>;

    return (
        <div className="patient-profile">
            <h1>{username}'s Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>Blood Group</label>
                <input
                    name="blood_group"
                    value={formData?.blood_group || ''}
                    placeholder="No data"
                    onChange={handleChange}
                />

                <label>Weight (kg)</label>
                <input
                    name="weight"
                    type="number"
                    value={formData?.weight || ''}
                    placeholder="No data"
                    onChange={handleChange}
                />

                <label>Age</label>
                <input
                    name="age"
                    type="number"
                    value={formData?.age || ''}
                    placeholder="No data"
                    onChange={handleChange}
                />

                <label>Address</label>
                <input
                    name="address"
                    value={formData?.address || ''}
                    placeholder="No data"
                    onChange={handleChange}
                />

                <label>Phone</label>
                <input
                    name="phone"
                    value={formData?.phone || ''}
                    placeholder="No data"
                    onChange={handleChange}
                />

                <label>Email</label>
                <input
                    name="email"
                    value={formData?.email || ''}
                    placeholder="No data"
                    onChange={handleChange}
                />

                <label>Medical Conditions (comma-separated)</label>
                <input
                    name="medical_conditions"
                    value={formData?.medical_conditions?.join(', ') || ''}
                    placeholder="No data"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            medical_conditions: e.target.value.split(',').map((cond) => cond.trim()),
                        })
                    }
                />

                <label>Donation</label>
                <input
                    name="donation"
                    value={donation}
                    placeholder="Enter donation details"
                    onChange={handleDonationChange}
                />

                <button type="submit">Update Profile</button>
            </form>

            {/* Display donation button only if the user has donated */}
            {donation && (
                <button className="donation-button" onClick={handleRemoveDonation}>
                    Donated
                </button>
            )}
        </div>
    );
};

export default PatientProfile;
