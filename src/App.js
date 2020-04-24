import React, { Component } from "react";
import Moment from "moment";
import "moment-timezone";
import tz from "zipcode-to-timezone";

class App extends Component {
  state = {};

  getTime = () => {
    const zone = tz.lookup(this.state.zip);
    const now = Moment().tz(zone).format("dddd, MMMM Do YYYY, h:mm:ss a");

    this.setState({
      time: now,
    });
  };

  getWeather = () => {
    const zipInput = document.getElementById("zipInput").value;

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        zipInput +
        ",us&appid=c65692185192c2852cfc0a2ec9095d2a&units=imperial"
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          console.log(data);
          this.setState({
            zip: zipInput,
            temperature: Math.round(data.main.temp) + "°C",
            city: data.name,
            description: data.weather[0].description,
            timezone: data.timezone,
          });
          this.getTime();
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  };

  render() {
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
