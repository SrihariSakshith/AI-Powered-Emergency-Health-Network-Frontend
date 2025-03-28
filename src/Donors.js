import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Donors.css';

const Donors = ({ username, role }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedBloodDonors, setRecommendedBloodDonors] = useState([]);
  const [recommendedLocationDonors, setRecommendedLocationDonors] = useState([]);
  const [location, setLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [userBloodGroup, setUserBloodGroup] = useState('');

  useEffect(() => {
    const fetchDonorsData = async () => {
      try {
        // Fetch all donors
        const donorsResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL || 'https://ai-powered-emergency-health-network-server.vercel.app/'}/donors/api/donors`
        );
        console.log("All Donors API Response:", donorsResponse.data);

        if (Array.isArray(donorsResponse.data)) {
          setDonors(donorsResponse.data);
        } else {
          console.error("All Donors API returned non-array data:", donorsResponse.data);
          setError("Error: Invalid donors data format. Please check the API response.");
          setLoading(false);
          return; // Exit early to prevent further errors
        }

        // Fetch user location
        setLoadingLocation(true);
        try {
          const locationResponse = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL || 'https://ai-powered-emergency-health-network-server.vercel.app/'}/donors/api/user-location`,
            { params: { username, role } }
          );

          if (locationResponse.status === 404) {
            console.error("User location not found.");
            setLocationError("User location not found.");
          } else {
            setLocation(locationResponse.data.location || 'Location not found');
          }
        } catch (locationError) {
          console.error("Error fetching user location:", locationError);
          setLocationError("Error fetching user location.");
        }
        setLoadingLocation(false);

        // Fetch user blood group (if patient)
        if (role === 'patient') {
          try {
            const bloodGroupResponse = await axios.get(
              `${process.env.REACT_APP_API_BASE_URL || 'https://ai-powered-emergency-health-network-server.vercel.app/'}/donors/api/user-blood-group`,
              { params: { username } }
            );

            if (bloodGroupResponse.status === 404) {
              console.error("Blood group not found.");
              setUserBloodGroup(''); // Default to no blood group
            } else {
              setUserBloodGroup(bloodGroupResponse.data.blood_group || '');
            }
          } catch (bloodGroupError) {
            console.error("Error fetching user blood group:", bloodGroupError);
            setUserBloodGroup(''); // Default to no blood group
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching donor data. Please check the API endpoint.');
      } finally {
        setLoading(false);
        setLoadingLocation(false);
      }
    };

    fetchDonorsData();
  }, [username, role]);

  useEffect(() => {
    if (location && donors.length > 0) {
      const locationDonors = donors.filter((donor) =>
        donor.location?.toLowerCase().includes(location.toLowerCase())
      );
      setRecommendedLocationDonors(locationDonors);
    }
  }, [location, donors]);

  useEffect(() => {
    if (donors.length > 0) {
      const bloodGroupDonors = donors.filter((donor) =>
        userBloodGroup
          ? donor.donation?.toLowerCase().includes(userBloodGroup.toLowerCase())
          : true // Include all donors if no blood group is provided
      );
      setRecommendedBloodDonors(bloodGroupDonors);
    }
  }, [userBloodGroup, donors]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleLocationSearch = (e) => setLocationSearchQuery(e.target.value);

  const filteredDonors = donors.filter((donor) =>
    donor.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.donation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLocationDonors = recommendedLocationDonors.filter((donor) =>
    donor.username?.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
    donor.location?.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
    donor.donation?.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  if (loading || loadingLocation) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="donors-container">
      <h1 className="heading">Donors</h1>

      {role === 'patient' && (
        <>
          <h2>Recommended Donors Based on Blood Group and Location</h2>
          <div className="donors-list">
            {recommendedBloodDonors.length > 0 ? (
              recommendedBloodDonors.map((donor) => (
                <div className="donor-card" key={donor.username}>
                  <h3 className="donor-name">{donor.username}</h3>
                  <p className="donor-donation">
                    <strong>Donation:</strong> {donor.donation || 'Not Available'}
                  </p>
                  <p className="donor-email">
                    <strong>Email:</strong> {donor.email || 'Not Available'}
                  </p>
                  <p className="donor-location">
                    <strong>Location:</strong> {donor.location || 'Not Available'}
                  </p>
                </div>
              ))
            ) : (
              <p>No donors found matching your blood group and location. Showing all donors instead.</p>
            )}
          </div>
        </>
      )}

      <h2>Recommended Donors Based on Location</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search in location-based donors"
          className="search-input"
          value={locationSearchQuery}
          onChange={handleLocationSearch}
        />
      </div>

      <div className="donors-list">
        {filteredLocationDonors.length > 0 ? (
          filteredLocationDonors.map((donor) => (
            <div className="donor-card" key={donor.username}>
              <h3 className="donor-name">{donor.username}</h3>
              <p className="donor-donation">
                <strong>Donation:</strong> {donor.donation || 'Not Available'}
              </p>
              <p className="donor-email">
                <strong>Email:</strong> {donor.email || 'Not Available'}
              </p>
              <p className="donor-location">
                <strong>Location:</strong> {donor.location || 'Not Available'}
              </p>
            </div>
          ))
        ) : (
          <p>No location-based donors found.</p>
        )}
      </div>

      <h2>All Donors</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search all donors"
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="donors-list">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div className="donor-card" key={donor.username}>
              <h3 className="donor-name">{donor.username}</h3>
              <p className="donor-donation">
                <strong>Donation:</strong> {donor.donation || 'Not Available'}
              </p>
              <p className="donor-email">
                <strong>Email:</strong> {donor.email || 'Not Available'}
              </p>
              <p className="donor-location">
                <strong>Location:</strong> {donor.location || 'Not Available'}
              </p>
            </div>
          ))
        ) : (
          <p>No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default Donors;