import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import axios from "axios";
import {Card} from "react-bootstrap";

const CoverPhoto = () => {
  const [search, setSearch] = useState("");
  const [apiData, setApiData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
  
    setSearch(event.target.elements.searchbar.value);
  };
  // This code only kicks in if "search" ever changes value.
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `https://api.openbrewerydb.org/breweries?by_city=${search}`
      );
      console.log(response.data);
      // Save the fetch data into the apiData state var
      setApiData(response.data);
    };
    fetchData();
  }, [search]);
  console.log(apiData);
  return (
    <div className="CoverPhoto">
      <h1>Git Brew'd</h1>
      <SearchForm handleSubmitProp={handleSubmit} />
      <div className="brewery">
        {apiData.map((brewery) => {
          return (
            <div className="brewery-card" id="brewery-card" key={brewery.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{brewery.name}</Card.Title>
                  <Card.Text>{brewery.city}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
      );
    </div>
  );
};
export default CoverPhoto;