import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Hospitals.css';

const Hospitals = ({ username, role }) => {
  const [hospitals, setHospitals] = useState([]);
  const [recommendedHospitals, setRecommendedHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQueryHospitals, setSearchQueryHospitals] = useState('');
  const [searchFieldHospitals, setSearchFieldHospitals] = useState('username');
  const [searchQueryRecommended, setSearchQueryRecommended] = useState('');
  const [searchFieldRecommended, setSearchFieldRecommended] = useState('username');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalsResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL || 'https://ai-powered-emergency-health-network.onrender.com'}/hospitals/all`
        );

        if (Array.isArray(hospitalsResponse.data)) {
          setHospitals(hospitalsResponse.data);
        } else {
          setError("Error: Invalid hospital data format (all hospitals)");
          return;
        }

        const recommendedResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL || 'https://ai-powered-emergency-health-network.onrender.com'}/hospitals/recommended`,
          {
            params: { role, username },
          }
        );

        if (Array.isArray(recommendedResponse.data)) {
          setRecommendedHospitals(recommendedResponse.data);
        } else {
          setError("Error: Invalid hospital data format (recommended hospitals)");
          return;
        }

        setLoading(false);
      } catch (err) {
        setError('Error fetching hospital data');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [role, username]);

  const handleSearchHospitals = (e) => setSearchQueryHospitals(e.target.value);
  const handleFieldChangeHospitals = (e) => setSearchFieldHospitals(e.target.value);
  const handleSearchRecommended = (e) => setSearchQueryRecommended(e.target.value);
  const handleFieldChangeRecommended = (e) => setSearchFieldRecommended(e.target.value);

  const normalizeTestsAvailable = (tests) => {
    if (typeof tests === 'string') return tests.split(',').map((t) => t.trim());
    return Array.isArray(tests) ? tests : [];
  };

  const filterHospitals = (list, field, query) =>
    list.filter((hospital) => {
      const fieldValue = hospital[field] || '';
      if (Array.isArray(fieldValue)) {
        return fieldValue.some((val) => val.toLowerCase().includes(query.toLowerCase()));
      }
      return fieldValue.toLowerCase().includes(query.toLowerCase());
    });

  const filteredHospitals = filterHospitals(hospitals, searchFieldHospitals, searchQueryHospitals);
  const filteredRecommended = filterHospitals(recommendedHospitals, searchFieldRecommended, searchQueryRecommended);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const renderHospitalCard = (hospital) => (
    <div className="hospital-card" key={hospital.username}>
      <h3 className="hospital-name">{hospital.username}</h3>
      <p className="hospital-location">Location: {hospital.location || 'Not Available'}</p>
      <button className="details-btn">Details</button>
      <div className="hospital-details">
        <p className="hospital-description"><strong>Description:</strong> {hospital.description}</p>
        <p className="hospital-tests"><strong>Tests Available:</strong> {normalizeTestsAvailable(hospital.tests_available).join(', ') || 'Not Available'}</p>
        <p className="hospital-specialties"><strong>Specialties:</strong> {Array.isArray(hospital.specialties) ? hospital.specialties.join(', ') : hospital.specialties || 'Not Available'}</p>
        <p className="hospital-facilities"><strong>Facilities:</strong> {Array.isArray(hospital.facilities) ? hospital.facilities.join(', ') : hospital.facilities || 'Not Available'}</p>
      </div>
    </div>
  );

  return (
    <div className="hospitals-container">
      <h1 className="heading">Hospitals</h1>

      <div className="search-container-wrapper">
        <h2>Recommended Hospitals</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder={`Search by ${searchFieldRecommended}`}
            className="search-input"
            value={searchQueryRecommended}
            onChange={handleSearchRecommended}
          />
          <select
            value={searchFieldRecommended}
            onChange={handleFieldChangeRecommended}
            className="search-dropdown"
          >
            <option value="username">Username</option>
            <option value="description">Description</option>
            <option value="tests_available">Tests Available</option>
            <option value="specialties">Specialties</option>
            <option value="facilities">Facilities</option>
          </select>
        </div>
      </div>

      <div className="hospitals-list">
        {filteredRecommended.length > 0
          ? filteredRecommended.map(renderHospitalCard)
          : <p>No recommended hospitals found matching your search.</p>}
      </div>

      <div className="search-container-wrapper">
        <h2>All Hospitals</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder={`Search by ${searchFieldHospitals}`}
            className="search-input"
            value={searchQueryHospitals}
            onChange={handleSearchHospitals}
          />
          <select
            value={searchFieldHospitals}
            onChange={handleFieldChangeHospitals}
            className="search-dropdown"
          >
            <option value="username">Username</option>
            <option value="location">Location</option>
            <option value="description">Description</option>
            <option value="tests_available">Tests Available</option>
            <option value="specialties">Specialties</option>
            <option value="facilities">Facilities</option>
          </select>
        </div>
      </div>

      <div className="hospitals-list">
        {filteredHospitals.length > 0
          ? filteredHospitals.map(renderHospitalCard)
          : <p>No hospitals found matching your search.</p>}
      </div>
    </div>
  );
};

export default Hospitals;
