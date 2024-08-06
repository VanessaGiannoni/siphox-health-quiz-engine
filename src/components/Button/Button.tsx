import './button.scss';

export interface ButtonProps {
  label: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
}

export default function Button({ label, type, onClick }: ButtonProps) {
  return (
    <div className='button-container'>
      <button onClick={onClick} type={type}>{label}</button>
    </div>
  )
}

