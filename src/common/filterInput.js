import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  box-sizing: border-box;
  padding: 2px 5px;
  padding-left: 22px;
  font-size: 16px;
  outline: none;
`;
let debounce;
let debounceLoad;

export const FilterInput = ({filterValue, updateValue, setLoading}) => {  
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (inputValue !== filterValue) {
      setInputValue(filterValue);
    }
  }, [filterValue]);

  const changeValue = (value) => {
      setInputValue(value);

      if (debounce && debounceLoad) {
        clearTimeout(debounce);
        clearTimeout(debounceLoad);
      }
      debounceLoad = setTimeout(() => setLoading(), 400);
      debounce = setTimeout(() => updateValue(value), 500);
  };

  return <div>
    <StyledInput type="text" value={inputValue || ''} onChange={e => changeValue(e.target.value)} />
  </div>
}
