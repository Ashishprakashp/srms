import {React} from 'react';

const Page1 = ({formData,setFormData}) => {
    return (
        <div>
          <h2>Page 1: Personal Information</h2>
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
        </div>
      );
};

export default Page1;