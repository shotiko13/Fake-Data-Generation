import React, { useState } from 'react';
import CountryDropdown from './CountryDropdown';
import SeedSlider from './SeedSlider';

interface ControlsProps {
  errorCount: number;
  setErrorCount: React.Dispatch<React.SetStateAction<number>>;
  users: any[];
}

const Controls: React.FC<ControlsProps> = ({ errorCount, setErrorCount, users}) => {
  const [country, setCountry] = useState<string>('');

  const MAX_ERRORS = 10;
  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * (MAX_ERRORS + 1));
    setErrorCount(randomSeed);
  };

  const arrayToCsv = (data: any[]) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(",")).join("\n");
    return `${header}\n${rows}`;
  };
  
  const downloadCSV = (data: any[], filename: string) => {
    const csv = arrayToCsv(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  

  return (
    <div className="container mt-5">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><CountryDropdown handleCountryChange={(value) => setCountry(value)} /></td>
            <SeedSlider handleSliderChange={setErrorCount} currentSeed={errorCount} maxErrors={MAX_ERRORS}/>
            <td><button className="btn btn-success" onClick={handleRandomSeed}>Random Seed</button></td>
            <button className="btn btn-primary" onClick={() => downloadCSV(users, "users.csv")}>Export CSV</button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Controls;
