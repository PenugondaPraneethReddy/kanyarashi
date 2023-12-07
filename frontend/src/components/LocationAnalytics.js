import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationAnalytics = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    console.log("testing use effect");
    const res = axios.get("/location-analytics")
      .then((response) => {
        setLocations(response.data);
        console.log("data is ",response.data);
      }).catch((err) => console.log(err));
    console.log("testing axios ",res);
    if (res.status !== 200) {
      return console.log("No Data");
    }
  }, []);

  console.log("Hi",locations);


  return (
    <div className="mainListing">
      <center><h1>Location Analytics</h1></center>
      <ul className="movies-list" style={{ listStyle: "none", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
      {locations.map((city) => (
        <li key={city.location} className="movie-tile" style={{ margin: "10px", width: "200px" }}>
          <div className="theatre-tile">
            <h2>{city.location}</h2>
            <p>Booked Seats: {city.bookedseats}</p>
            <p>Total Seats: {city.totalseats}</p>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default LocationAnalytics;
