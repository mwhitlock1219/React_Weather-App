import React, { Component } from "react";
import Moment from "moment";
import "moment-timezone";
import tz from "zipcode-to-timezone";
import "./App.css";

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
            temperature: data.main.temp,
            city: data.name,
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
      <div>
        <div>
          <header className="headerContainer">
            <input
              className="headerInput"
              type="text"
              placeholder="Enter ZIP Code"
              id="zipInput"
            ></input>
            <button className="headerSubmit" onClick={this.getWeather}>
              Search
            </button>
          </header>
        </div>
        <h1 className="title">Weather App</h1>

        <div className="weatherDisplay">
          <h1 id="temp">{this.state.temperature}</h1>
          <h2 id="city">{this.state.city}</h2>
          <h3>{this.state.time}</h3>
        </div>
      </div>
    );
  }
}

export default App;
