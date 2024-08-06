
import './text-input.scss';

interface TextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function TextInput({ onChange, onKeyDown }: TextInputProps) {
  return (
    <div className='custom-input'>
      <label className='label'>Type your answer: </label>
      <input
        className='input'
        type='text' 
        aria-label='Type your answer' 
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </div>
  )
}

