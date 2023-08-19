import React, { useState, useEffect } from 'react';
import { fakerEN_US, fakerPL, fakerKA_GE } from "@faker-js/faker";
import Card from './components/card/Card';
import CountryDropdown from './components/controls/CountryDropdown';
import Navbar from './components/navbar/Navbar';
import Controls from './components/controls/Controls';
import { v4 as uuid4} from 'uuid';

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

  type FakerType = typeof fakerEN_US | typeof fakerPL | typeof fakerKA_GE;

  const generateUser = (fakerInstance: FakerType) => {
    let _index = 1;

    return function() {
      return {
        index: _index++,
        id: uuid4(),
        firstName: fakerInstance.person.firstName(),
        middleName: fakerInstance.person.middleName(),
        lastName: fakerInstance.person.lastName(),
        address: generateRandomAddress(fakerInstance),
        phoneNumber: fakerInstance.phone.number(),
      };
    }
  };

  function generateRandomAddress(fakerInstance: FakerType): string {
    return fakerInstance.helpers.arrayElement([
      fakerInstance.location.streetAddress(),
      fakerInstance.location.streetAddress(true),
    ]);
  }
  
  useEffect(() => {
    let selectedFaker;
    switch (country) {
      case "Georgia":
        selectedFaker = fakerKA_GE;
        break;
      case "Poland":
        selectedFaker = fakerPL;
        break;
      case "USA":
      default:
        selectedFaker = fakerEN_US;
        break;
    }
  
    const generate = generateUser(selectedFaker);
    const generatedUsers = Array.from({ length: 20 }, () => generate());
    setUsers(generatedUsers);
  }, [country]);
  

  return (
    <div className="App">
      <Navbar githubLink='https://github.com/shotiko13/Fake-Data-Generation' />
      <Controls />
      
        <div className="mb-3">
          <CountryDropdown handleCountryChange={handleCountryChange} />
        </div>
        <div className="row justify-content-center">
          {users.map(user => (
            <div className="col-12 col-md-6 offset-md-3 mb-2" key={user.id}>
              
                <Card user={user} country={countryCodes[country]} />
              
            </div>  
          ))}
        </div>
        
    </div>
  );
}

export default App;
