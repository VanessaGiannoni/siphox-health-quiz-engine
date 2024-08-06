import { FormEvent } from 'react';
import Button from '../Button/Button';
import './error-message.scss';

export default function ErrorMessage({ description }: { description: string }) {
  const handleTryAgain = (event: FormEvent): void => {
    event.preventDefault();
    window.location.reload();
  }

  return (
    <div className='error-container'>
      <h1 className='error-message'>{description}</h1>
      <Button label='Try again' onClick={handleTryAgain} type='button'/>
    </div>
  )
}
