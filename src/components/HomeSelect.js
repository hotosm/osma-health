import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';

export default ({boundaries, handleChange}) => {
  let options = [];

  if (boundaries.length > 0) {
    options = boundaries.map(fc => {
      const {name, id, country} = fc.properties;
      return { value: `${country}/${id}`, label: `${country} - ${name}` };
    });
  }

  return (
    <Select
      name="boundary-select"
      options={options}
      onChange={handleChange}
    />
  )
}