import React, { useState } from 'react';
import axios from 'axios';

function Test() {
  const [formData, setFormData] = useState({
    name: '',
    age: null,
    email: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors([]);
  
    const sanitizedData = {
      ...formData,
      age: Number(formData.age)  // Convert age to a number
    };
  
    try {
      const response = await axios.post('http://localhost:5000/submit', sanitizedData);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessage('An error occurred while submitting the form.');
      }
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN Injection Filter Example</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          <h3>Errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg || error.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Test;