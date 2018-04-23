import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import upperFirst from 'lodash.upperfirst';

export default ({boundaries, handleChange}) => {
  let options = [];

  if (boundaries.length > 0) {
    options = boundaries.map(fc => {
      const {name, id, country} = fc.properties;
      return { value: `${country}/${id}`, label: `${upperFirst(country)} - ${name}` };
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