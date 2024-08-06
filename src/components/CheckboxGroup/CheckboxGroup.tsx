import React, { useState, useEffect } from 'react';
import './checkbox-group.scss';

interface CheckboxGroupProps {
  options: string[] | string | undefined;
  onChange: (checkedOptions: string[]) => void;
}

export default function CheckboxGroup({ options, onChange }: CheckboxGroupProps) {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [normalizedOptions, setNormalizedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (typeof options === 'string') {
      setNormalizedOptions([options]);
    } else if (Array.isArray(options)) {
      setNormalizedOptions(options);
    }
  }, [options]);

  const handleCheckboxClick = (option: string) => {
    const updatedCheckedOptions = checkedOptions.includes(option)
      ? checkedOptions.filter(item => item !== option)
      : [...checkedOptions, option];
    
    setCheckedOptions(updatedCheckedOptions);
    onChange(updatedCheckedOptions);
  };

  return (
    <div className='check-group'>
      {normalizedOptions.map((option: string) => (
        <label className='checkbox' key={option}>
          <input 
            type='checkbox' 
            checked={checkedOptions.includes(option)} 
            onChange={() => handleCheckboxClick(option)} 
          /> 
          {option} 
          <span></span>
        </label>
      ))}
    </div>
  );
}
