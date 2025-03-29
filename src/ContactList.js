import React, { useEffect, useState } from 'react';
import './css/ContactList.css';  

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contacts data from the server
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://ai-powered-emergency-health-network.onrender.com/contact-list/api/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div className="loading-status">Loading...</div>;
  }

  if (error) {
    return <div className="error-status">Error: {error}</div>;
  }

  return (
    <div className="contact-list-wrapper">
      <h1 className="contact-list-title">Queries</h1>
      {contacts.length === 0 ? (
        <p className="no-queries-found">No contacts found.</p>
      ) : (
        <ul className="query-list">
          {contacts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting by most recent date
            .map((contact, index) => (
              <li key={index} className="query-item">
                <h3 className="query-username">{contact.username}</h3>
                <p className="query-description">{contact.description}</p>
                <p className="query-time">
                  <strong>Created At:</strong> {contact.createdAt}
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
