import React from 'react';

interface SeedSliderProps {
  handleSliderChange: (value: number) => void;
  currentSeed: number;
}

const SeedSlider: React.FC<SeedSliderProps> = ({ handleSliderChange, currentSeed }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <label>{currentSeed}</label>
      <input 
        type="range" 
        className="custom-range" 
        min="0" 
        max="1000" 
        value={currentSeed}
        onChange={e => handleSliderChange(Number(e.target.value))}
      />
    </div>
  );
}

export default SeedSlider;
