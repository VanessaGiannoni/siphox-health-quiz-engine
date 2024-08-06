import React from 'react'
import './progress-bar.scss';

interface ProgressBarProps {
  total: number;
  current: number;
}

export default function ProgressBar({ total, current }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="progress-bar-container">
      
      <div className="progress-bar" style={{ width: `${progress}%`, paddingRight: current > 0 ? "4px" : 0}}>
      {current > 0 && `${Math.round(progress)}%`}
      </div>
    </div>
  )
}
