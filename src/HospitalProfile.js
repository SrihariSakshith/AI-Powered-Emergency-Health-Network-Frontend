import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/HospitalProfile.css'; // Assuming you have the CSS file in the same directory

const HospitalProfile = ({ username }) => {
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    tests_available: '',
    specialties: '',
    facilities: '',
    email: '',
    donation: '' // Adding donation field
  });

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get(`https://ai-powered-emergency-health-network.onrender.com/hospital-profile/api/hospital/${username}`);
        setHospital(response.data);
        setFormData({
          location: response.data.location || '',
          description: response.data.description || '',
          tests_available: response.data.tests_available || '',
          specialties: response.data.specialties || '',
          facilities: response.data.facilities || '',
          email: response.data.email || '',
          donation: response.data.donation || '' // Setting the donation field value
        });
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      }
    };

    fetchHospitalData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        username,
        location: formData.location,
        description: formData.description,
        tests_available: formData.tests_available,
        specialties: formData.specialties,
        facilities: formData.facilities,
        email: formData.email,
        donation: formData.donation // Including donation in the updated data
      };

      const response = await axios.put(`https://ai-powered-emergency-health-network.onrender.com/hospital-profile/api/hospital/${username}`, updatedData);
      console.log('Updated successfully:', response.data);
      alert('Hospital profile updated successfully!');
      setHospital(response.data);
    } catch (err) {
      setError('Error updating data');
      console.error('Error updating data:', err);
    }
  };

  const handleDonationDelete = async () => {
    try {
      await axios.delete(`https://ai-powered-emergency-health-network.onrender.com/hospital-profile/api/hospital/${username}/donation`);
      alert('Donation removed successfully!');
      setHospital({ ...hospital, donation: undefined });
      setFormData({ ...formData, donation: '' }); // Reset donation field
    } catch (err) {
      console.error('Error deleting donation:', err);
      alert('Failed to remove donation');
    }
  };

  if (error) {
    return <div className="hospital-profile-error">{error}</div>;
  }

  if (!hospital) {
    return <div className="hospital-profile-loading">Loading...</div>;
  }

  return (
    <div className="hospital-profile-container">
      <h1 className="hospital-profile-title">{hospital.username}</h1>
      <div className="hospital-profile-details">
        <div className="hospital-profile-item">
          <strong>Location:</strong> <span>{hospital.location || "No Data"}</span>
        </div>
        <div className="hospital-profile-item">
          <strong>Description:</strong> <span>{hospital.description || "No Data"}</span>
        </div>
        <div className="hospital-profile-item">
          <strong>Tests Available:</strong> <span>{hospital.tests_available || "No Data"}</span>
        </div>
        <div className="hospital-profile-item">
          <strong>Specialties:</strong> <span>{hospital.specialties || "No Data"}</span>
        </div>
        <div className="hospital-profile-item">
          <strong>Facilities:</strong> <span>{hospital.facilities || "No Data"}</span>
        </div>
        <div className="hospital-profile-item">
          <strong>Email:</strong> <span>{hospital.email || "No Data"}</span>
        </div>
        <div className="hospital-profile-item">
          <strong>Donation:</strong> <span>{hospital.donation || "No Data"}</span>
        </div>
      </div>

      <h2 className="hospital-profile-update-title">Update Hospital Profile</h2>
      <form className="hospital-profile-form" onSubmit={handleSubmit}>
        <div className="hospital-profile-form-group">
          <label className="hospital-profile-label">Location:</label>
          <input
            className="hospital-profile-input"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="hospital-profile-form-group">
          <label className="hospital-profile-label">Description:</label>
          <textarea
            className="hospital-profile-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="hospital-profile-form-group">
          <label className="hospital-profile-label">Tests Available (comma separated):</label>
          <input
            className="hospital-profile-input"
            type="text"
            name="tests_available"
            value={formData.tests_available}
            onChange={handleChange}
          />
        </div>
        <div className="hospital-profile-form-group">
          <label className="hospital-profile-label">Specialties (comma separated):</label>
          <input
            className="hospital-profile-input"
            type="text"
            name="specialties"
            value={formData.specialties}
            onChange={handleChange}
          />
        </div>
        <div className="hospital-profile-form-group">
          <label className="hospital-profile-label">Facilities (comma separated):</label>
          <input
            className="hospital-profile-input"
            type="text"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
          />
        </div>
        <div className="hospital-profile-form-group">
          <label className="hospital-profile-label">Email:</label>
          <input
            className="hospital-profile-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="hospital-profile-form-group">
          <label className="hospital-profile-label">Donation:</label>
          <input
            className="hospital-profile-input"
            type="text"
            name="donation"
            value={formData.donation}
            onChange={handleChange}
          />
        </div>
        <button className="hospital-profile-submit-button" type="submit">Update</button>
        {hospital.donation && (
          <button
            className="hospital-profile-donation-button"
            type="button"
            onClick={handleDonationDelete}
          >
            Donated
          </button>
        )}
      </form>
    </div>
  );
};

export default HospitalProfile;
