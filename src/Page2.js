import React from 'react';

const Page2 = ({ formData, setFormData }) => {
  return (
    <div>
      <h2>Page 2: Address Information</h2>
      <label>
        Address:
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </label>
    </div>
  );
};

export default Page2;