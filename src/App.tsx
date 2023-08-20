import React, { useState, useEffect } from 'react';
import { fakerEN_US, fakerPL, fakerKA_GE } from "@faker-js/faker";
import Card from './components/card/Card';
import CountryDropdown from './components/controls/CountryDropdown';
import Navbar from './components/navbar/Navbar';
import Controls from './components/controls/Controls';
import { v4 as uuid4} from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [country, setCountry] = useState("USA");
  const [page, setPage] = useState(1);
  const [errorCount, setErrorCount] = useState<number>(0);

  
  const countryCodes: { [key: string]: string } = {
    "Georgia": "GE",
    "USA": "USA",
    "Poland": "POL",
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setPage(1);
  }

  type FakerType = typeof fakerEN_US | typeof fakerPL | typeof fakerKA_GE;

  const generateUser = (fakerInstance: FakerType, errors: number) => {
    let _index = 1;

    return function() {
      return {
        index: _index++,
        id: uuid4(),
        firstName: introduceErrors(fakerInstance.person.firstName(), errors),
        middleName: introduceErrors(fakerInstance.person.middleName(), errors),
        lastName: introduceErrors(fakerInstance.person.lastName(), errors),
        address: introduceErrors(generateRandomAddress(fakerInstance), errors),
        phoneNumber: introduceErrors(fakerInstance.phone.number(), errors),
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
    const generate = generateUser(selectedFaker, errorCount);
    const generatedUsers = Array.from({ length: 20 }, () => generate());
    if (page === 1) {
      setUsers(generatedUsers);
    } else {
      setUsers(prevUsers => [...prevUsers, ...generatedUsers]);
    }
  }, [country, page, errorCount]);
  

  const introduceErrors = (text: string, errors: number): string => {
    const actions = [
      (str: string) => str.slice(0, -1), 
      (str: string) => str + String.fromCharCode(Math.floor(Math.random() * 25) + 97), 
      (str: string) => str.slice(0, -2) + str.charAt(str.length - 1) + str.charAt(str.length - 2),
    ];
    
    let modifiedText = text;
  
    for (let i = 0; i < errors; i++) {
      const action = actions[Math.floor(Math.random() * actions.length)];
      modifiedText = action(modifiedText);
    }
  
    return modifiedText;
  };
  
  return (
    <div className="App">
      <Navbar githubLink='https://github.com/shotiko13/Fake-Data-Generation' />
      <Controls errorCount={errorCount} setErrorCount={setErrorCount} users={users} />
      
        <div className="mb-3">
          <CountryDropdown handleCountryChange={handleCountryChange} />
        </div>
        <div className="row justify-content-center">
        <InfiniteScroll
          dataLength={users.length} 
          next={() => setPage(prevPage => prevPage + 1)} 
          hasMore={true} 
          loader={<h4>Loading more...</h4>}
        >
          {users.map(user => (
            <div className="col-12 col-md-6 offset-md-3 mb-2" key={user.id}>
              
                <Card user={user} country={countryCodes[country]} />
              
            </div>  
          ))}
        </InfiniteScroll>
      </div>
    </div>
        
  )
}

export default App;
