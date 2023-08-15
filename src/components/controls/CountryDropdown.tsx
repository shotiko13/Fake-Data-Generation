import React from 'react';

const CountryDropdown: React.FC<{ handleCountryChange: (country: string) => void }> = ({ handleCountryChange }) => {
  return (
    <select className="form-control" onChange={(e) => handleCountryChange(e.target.value)}>
      <option value="">Select Country</option>
      <option value="Georgia">Georgia</option>
      <option value="Poland">Poland</option>
      <option value="USA">USA</option>
    </select>
  );
}

export default CountryDropdown;
