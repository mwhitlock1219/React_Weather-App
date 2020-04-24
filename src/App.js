import React, { Component } from "react";
import Moment from "moment";
import "moment-timezone";
import tz from "zipcode-to-timezone";

class App extends Component {
  state = {}; // leave blank because you'll be getting this info from your fetch and then setting it as state

  getTime = () => {
    const zone = tz.lookup(this.state.zip); //uses "zipcode-to-timezone" to find hte timezone of the zip that has been fetched
    const now = Moment().tz(zone).format("dddd, MMMM Do YYYY, h:mm:ss a"); // uses "moment" to find date&time of call then timezone in input using variable above then eveything is fomatted to  look nice

    this.setState({
      // sets as state to call back in render
      time: now,
    });
  };

  getWeather = () => {
    const zipInput = document.getElementById("zipInput").value; //making the input of user a variable to fetch api

    fetch(
      // fetching api data using user input (zipInput)
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zipInput +
        ",us&appid=c65692185192c2852cfc0a2ec9095d2a&units=imperial" // api key and converting info to metric
    )
      .then((response) => {
        // if data could not be fetch this would catch it and let you know there was an error
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        response.json().then((data) => {
          //changes data from json to strings
          console.log(data); // use to look through data object to figure out path to info
          this.setState({
            // setting the different states to call on later in render
            zip: zipInput,
            temperature: Math.round(data.main.temp) + "°C",
            city: data.name,
            description: data.weather[0].description,
            timezone: data.timezone,
          });
          this.getTime(); //calls function
        });
      })
      .catch(function (err) {
        // if there is a error after fetching the data from the api this message will appear.
        console.log("Fetch Error :-S", err);
      });
  };

  render() {
    // code is exported and rendered on html./ className= class in css/ {} used to input states declared in component
    return (
      <div className="app">
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder=" Enter Zipcode Here"
              id="zipInput"
            />
            <button className="search-button" onClick={this.getWeather}>
              Search
            </button>
          </div>

          <div className="location-box">
            <div className="location" id="city">
              {this.state.city}
            </div>
            <div className="date">{this.state.time}</div>
          </div>

          <div className="weather-box">
            <div className="temp" id="temperature">
              {this.state.temperature}
            </div>
            <div className="weather" id="description">
              {this.state.description}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
