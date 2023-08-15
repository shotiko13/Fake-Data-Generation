import React, { useState, useEffect } from 'react';
import { Faker } from "@faker-js/faker";
import Card from './Card';
import { generateUserFactory } from './userGenerator';
import CountryDropdown from './components/controls/CountryDropdown';
import Navbar from './components/navbar/Navbar';
import Controls from './components/controls/Controls';

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [country, setCountry] = useState("USA");
  
  const countryCodes: { [key: string]: string } = {
    "Georgia": "GE",
    "USA": "USA",
    "Poland": "POL",
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
  }

  useEffect(() => {
    const fakerInstance = new Faker();
    fakerInstance.setLocale(countryCodes[country]);
    const generateUser = generateUserFactory(fakerInstance);
    const generatedUsers = Array.from({ length: 20 }, () => generateUser());
    setUsers(generatedUsers);
  }, [country]);

  return (
    <div className="App">
      <Navbar githubLink='https://github.com/shotiko13/Fake-Data-Generation' />
      <Controls />
      <div className="mb-3">
        <CountryDropdown handleCountryChange={handleCountryChange} />
      </div>
      {users.map(user => <Card user={user} country={countryCodes[country]} key={user.id} />)}
    </div>
  );
}

export default App;
