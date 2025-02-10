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
    label: 'Mail',
    path: 'personalInformation.mail',
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
  {
    label: 'Sex',
    path: 'personalInformation.sex',
    type: 'enum',
    enumOptions: ['M', 'F'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'Spl category',
    path: 'personalInformation.splcategory',
    type: 'enum',
    enumOptions: ['None', 'Ph','Sports','Ex-Service man','NRI','Other States','Any Other'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'Volunteer in',
    path: 'personalInformation.volunteer',
    type: 'enum',
    enumOptions: ['None', 'NSS','NSO','YRC'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'Ug degree',
    path: 'education.ug',
    type: 'enum',
    enumOptions: ['BE','BTech','Bsc','BCA'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'Ug percentage',
    path: 'education.ugPercentage',
    type: 'number',
    operators: [
      { label: '>', value: 'gt' },
      { label: '<', value: 'lt' },
      { label: '=', value: 'eq' },
    ],
  },
  {
    label: 'XII board',
    path: 'education.xiiBoard',
    type: 'enum',
    enumOptions: ['cbse','state-board','icse','others'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'X board',
    path: 'education.xBoard',
    type: 'enum',
    enumOptions: ['cbse','state-board','icse','others'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'XII percentage',
    path: 'education.xiiPercentage',
    type: 'number',
    operators: [
      { label: '>', value: 'gt' },
      { label: '<', value: 'lt' },
      { label: '=', value: 'eq' },
    ],
  },
  {
    label: 'X percentage',
    path: 'education.xPercentage',
    type: 'number',
    operators: [
      { label: '>', value: 'gt' },
      { label: '<', value: 'lt' },
      { label: '=', value: 'eq' },
    ],
  },
  {
    label: 'Entrance exam',
    path: 'entranceAndWorkExperience.entrance',
    type: 'enum',
    enumOptions: ['TANCET','GATE'],
    operators: [{ label: 'Is', value: 'eq' }],
  },
  {
    label: 'Entrance Score',
    path: 'entranceAndWorkExperience.entranceScore',
    type: 'number',
    operators: [
      { label: '>', value: 'gt' },
      { label: '<', value: 'lt' },
      { label: '=', value: 'eq' },
    ],
  },
  {
    label: 'Father income',
    path: 'familyInformation.fatherInc',
    type: 'number',
    operators: [
      { label: '>', value: 'gt' },
      { label: '<', value: 'lt' },
      { label: '=', value: 'eq' },
    ],
  },
  // Add more attributes as needed...
];

function DynamicQuery() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [queriedAttributes, setQueriedAttributes] = useState([]);

  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      attributePath: availableAttributes[0].path,
      operator: availableAttributes[0].operators[0].value,
      value: '',
    };
    setFilters([...filters, newFilter]);
    console.log('Filter added:', newFilter); // Debugging
  };

  const removeFilter = (id) => {
    setFilters(filters.filter(filter => filter.id !== id));
    console.log('Filter removed:', id); // Debugging
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
    console.log('Attribute changed:', updatedFilters); // Debugging
  };

  const handleOperatorChange = (filterId, newOperator) => {
    const updatedFilters = filters.map(filter => ({
      ...filter,
      operator: filter.id === filterId ? newOperator : filter.operator,
    }));
    setFilters(updatedFilters);
    console.log('Operator changed:', updatedFilters); // Debugging
  };

  const handleValueChange = (filterId, newValue) => {
    const updatedFilters = filters.map(filter => ({
      ...filter,
      value: filter.id === filterId ? newValue : filter.value,
    }));
    setFilters(updatedFilters);
    console.log('Value changed:', updatedFilters); // Debugging
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

  const handleSearch = async () => {
    const query = buildQuery();
    console.log('Query built:', query); // Debugging
    try {
      const response = await axios.get("http://localhost:5000/students/dynamic", {
        params: { stmt: JSON.stringify(query) }
      });
      console.log('Search results:', response.data); // Debugging
      setSearchResults(response.data.data || []); // Ensure it's always an array
      const attributesInQuery = filters.map(filter => filter.attributePath);
      setQueriedAttributes([...new Set(attributesInQuery)]);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]); // Set to empty array on error
    }
  };

  const getNestedValue = (student, path) => {
    return path.split('.').reduce((obj, key) => {
      return (obj && obj[key] !== undefined) ? obj[key] : null;
    }, student) || '-'; // Return '-' if the value is null or undefined
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

              {attribute && (
  attribute.type === 'enum' ? (
    <select
      value={filter.value || ''}
      onChange={(e) => handleValueChange(filter.id, e.target.value)}
    >
      <option value="">Select an option</option>
      {attribute.enumOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  ) : (
    <input
      type={attribute.type === 'number' ? 'number' : attribute.type === 'date' ? 'date' : 'text'}
      value={filter.value || ''}
      onChange={(e) => handleValueChange(filter.id, e.target.value)}
      placeholder="Enter value..."
    />
  )
)}

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

        {searchResults && searchResults.length > 0 && (
          <div className="results-section">
            <h3>Search Results ({searchResults.length} found)</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    {queriedAttributes.map(path => {
                      const attr = availableAttributes.find(a => a.path === path);
                      return <th key={path}>{attr?.label || path}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map(student => (
                    <tr key={student._id}>
                      <td>{student.personalInformation?.register}</td>
                      <td>{student.personalInformation?.name}</td>
                      {queriedAttributes.map(path => (
                        <td key={path}>
                          {getNestedValue(student, path)?.toString() || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DynamicQuery;