import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTitleBar from '/home/ashish-prakash/Documents/pull2/src/AdminTitleBar.js';
import axios from 'axios';
import './DynamicQuery.css';

const availableAttributes = [
  {
    label: 'Student Name',
    path: 'personalInformation.name',
    type: 'string',
    operators: [
      { label: 'Starts With', value: 'startsWith' },
      { label: 'Ends With', value: 'endsWith' },
      { label: 'Contains', value: 'contains' },
      { label: 'Equals', value: 'equals' },
    ],
  },
  {
    label: 'Student ID',
    path: 'personalInformation.register',
    type: 'string',
    operators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Starts With', value: 'startsWith' },
      { label: 'Ends With', value: 'endsWith' },
    ],
  },
  {
    label: 'DOB',
    path: 'personalInformation.dob',
    type: 'date',
    operators: [
      { label: 'Before', value: 'before' },
      { label: 'After', value: 'after' },
      { label: 'On', value: 'on' },
    ],
  },
  {
    label: 'Cutoff',
    path: 'personalInformation.cutoff',
    type: 'number',
    operators: [
      { label: '>', value: 'gt' },
      { label: '<', value: 'lt' },
      { label: '=', value: 'eq' },
    ],
  },
  {
    label: 'Community',
    path: 'personalInformation.community',
    type: 'enum',
    enumOptions: ['OC', 'BC', 'MBC', 'SC', 'ST'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'Blood',
    path: 'personalInformation.blood',
    type: 'enum',
    enumOptions: ['O', 'A+', 'A', 'B+', 'B','C','RA/U'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  // Add more attributes as needed...
];

function DynamicQuery() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);

  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      attributePath: availableAttributes[0].path,
      operator: availableAttributes[0].operators[0].value,
      value: '',
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter(filter => filter.id !== id));
  };

  const handleAttributeChange = (filterId, newPath) => {
    const updatedFilters = filters.map(filter => {
      if (filter.id === filterId) {
        const newAttribute = availableAttributes.find(a => a.path === newPath);
        return {
          ...filter,
          attributePath: newPath,
          operator: newAttribute.operators[0].value,
          value: '',
        };
      }
      return filter;
    });
    setFilters(updatedFilters);
  };

  const handleOperatorChange = (filterId, newOperator) => {
    const updatedFilters = filters.map(filter => ({
      ...filter,
      operator: filter.id === filterId ? newOperator : filter.operator,
    }));
    setFilters(updatedFilters);
  };

  const handleValueChange = (filterId, newValue) => {
    const updatedFilters = filters.map(filter => ({
      ...filter,
      value: filter.id === filterId ? newValue : filter.value,
    }));
    setFilters(updatedFilters);
  };

  const buildQuery = () => {
    const queryConditions = filters.map(filter => {
      const attribute = availableAttributes.find(a => a.path === filter.attributePath);
      if (!attribute || !filter.value) return null;

      const { path, type } = attribute;
      const { operator, value } = filter;

      switch (operator) {
        case 'startsWith':
          return { [path]: { $regex: `^${value}`, $options: 'i' } };
        case 'endsWith':
          return { [path]: { $regex: `${value}$`, $options: 'i' } };
        case 'contains':
          return { [path]: { $regex: value, $options: 'i' } };
        case 'equals':
          return { [path]: value };
        case 'gt':
          return { [path]: { $gt: Number(value) } };
        case 'lt':
          return { [path]: { $lt: Number(value) } };
        case 'eq':
          return { [path]: value }; // For enum, use the value directly
        case 'before':
          return { [path]: { $lt: new Date(value) } };
        case 'after':
          return { [path]: { $gt: new Date(value) } };
        case 'on':
          const date = new Date(value);
          const start = new Date(date.setHours(0, 0, 0, 0));
          const end = new Date(date.setHours(23, 59, 59, 999));
          return { [path]: { $gte: start, $lte: end } };
        default:
          return null;
      }
    }).filter(condition => condition !== null);

    return queryConditions.length > 0 ? { $and: queryConditions } : {};
  };

  const handleSearch = async() => {
    const query = buildQuery();
    const response = await axios.get("http://localhost:5000/students/dynamic",{
        params: {stmt: JSON.stringify(query)}
    });
    console.log(response);
    console.log(query);
    // Navigate to results page with query
    // navigate('/search-results', { state: { query } });
  };

  const renderValueInput = (filter, attribute) => {
    const { type, enumOptions } = attribute;
    const handleChange = (e) => handleValueChange(filter.id, e.target.value);

    if (type === 'enum') {
      return (
        <select value={filter.value || ''} onChange={handleChange}>
          <option value="">Select...</option>
          {enumOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    if (type === 'date') {
      return (
        <input
          type="date"
          value={filter.value || ''}
          onChange={handleChange}
        />
      );
    }

    if (type === 'number') {
      return (
        <input
          type="number"
          value={filter.value || ''}
          onChange={handleChange}
        />
      );
    }

    return (
      <input
        type="text"
        value={filter.value || ''}
        onChange={handleChange}
        placeholder="Enter value..."
      />
    );
  };

  return (
    <div className="login-container">
      <AdminTitleBar title="IST Student Records Admin" />
      
      <div className="form-section">
        <h2>Dynamic Query</h2>
        <button type="button" onClick={addFilter} className="add-filter-btn">
          Add Filter
        </button>

        {filters.map(filter => {
          const attribute = availableAttributes.find(a => a.path === filter.attributePath);
          return (
            <div key={filter.id} className="filter-row">
              <select
                value={filter.attributePath}
                onChange={(e) => handleAttributeChange(filter.id, e.target.value)}
              >
                {availableAttributes.map(attr => (
                  <option key={attr.path} value={attr.path}>{attr.label}</option>
                ))}
              </select>

              <select
                value={filter.operator}
                onChange={(e) => handleOperatorChange(filter.id, e.target.value)}
              >
                {attribute?.operators.map(op => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>

              {attribute && renderValueInput(filter, attribute)}

              <button
                type="button"
                onClick={() => removeFilter(filter.id)}
                className="remove-filter-btn"
              >
                Remove
              </button>
            </div>
          );
        })}

        {filters.length > 0 && (
          <button
            type="button"
            onClick={handleSearch}
            className="search-btn"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
}

export default DynamicQuery;