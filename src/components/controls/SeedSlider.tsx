import React from 'react';

interface SeedSliderProps {
  handleSliderChange: (value: number) => void;
  currentSeed: number;
  maxErrors: number;
}

const SeedSlider: React.FC<SeedSliderProps> = ({ handleSliderChange, currentSeed, maxErrors }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <label>{currentSeed}</label>
      <input 
        type="range" 
        className="custom-range" 
        min="0" 
        max={maxErrors}
        value={currentSeed}
        onChange={e => handleSliderChange(Number(e.target.value))}
      />
      <input 
        type="number"
        value={currentSeed}
        onChange={e => {
          const value = Number(e.target.value);
          if (value >= 0 && value <= maxErrors) {
            handleSliderChange(value);
          }
        }}
      />
    </div>
  );

}

export default SeedSlider;
