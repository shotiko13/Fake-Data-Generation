import React, { useState } from 'react';
import CountryDropdown from './CountryDropdown';
import SeedSlider from './SeedSlider';

const Controls: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [seed, setSeed] = useState<number>(0);

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1001);
    setSeed(randomSeed);
  };

  return (
    <div className="container mt-5">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><CountryDropdown handleCountryChange={(value) => setCountry(value)} /></td>
            <SeedSlider handleSliderChange={(value) => setSeed(value)} currentSeed={seed} />
            <td><button className="btn btn-success" onClick={handleRandomSeed}>Random Seed</button></td>
            <td><button className="btn btn-primary">Export CSV</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Controls;
