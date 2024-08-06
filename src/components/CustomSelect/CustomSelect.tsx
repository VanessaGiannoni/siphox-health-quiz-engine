import React from 'react'
import './custom-select.scss';
import { decode } from 'html-entities';

interface CustomSelectProps {
  options: string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CustomSelect({ options, onChange }: CustomSelectProps) {
  return (
    <div className='custom-select'>
      <div className='custom-select-wrapper'>
        <label className='label'>Choose your answer: </label>
        <select onChange={onChange} className='custom-select' aria-label="Choose your answer">
          <option>Select...</option>
          {options?.map(
            (option) => (
              <option
                value={option}
                key={option}
              >
                {decode(option)}
              </option>
            )
          )}
        </select>
      </div>
      <div className='select-arrow'></div>
    </div>
  )
}
