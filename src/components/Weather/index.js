import React, { Component } from "react";
import Clock from "react-live-clock";
import ReactAnimatedWeather from "react-animated-weather";
import Forecast from "../Forecast";
import loader from "../../images/WeatherIcons.gif";
import apiKeys from "../../api/apiKeys";
import dateBuilder from "../../utils/dateBuilder.js";

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    country: undefined,
    temperatureC: undefined,
    humidity: undefined,
    main: undefined,
    icon: "CLEAR_DAY",
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch(() => {
          this.getWeather(28.67, 77.22);
          alert("You have disabled location service. Allow location access for real-time weather updates.");
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(() => this.getWeather(this.state.lat, this.state.lon), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    const response = await fetch(`${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`);
    const data = await response.json();
    this.setState({
      lat,
      lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
    });

    const weatherIconMap = {
      Haze: "CLEAR_DAY",
      Clouds: "CLOUDY",
      Rain: "RAIN",
      Snow: "SNOW",
      Dust: "WIND",
      Drizzle: "SLEET",
      Fog: "FOG",
      Smoke: "FOG",
      Tornado: "WIND",
    };
    this.setState({ icon: weatherIconMap[this.state.main] || "CLEAR_DAY" });
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <div>
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {this.state.temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forecast icon={this.state.icon} weather={this.state.main} />
        </div>
      );
    } else {
      return (
        <div>
          <img src={loader} alt="Loading" style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>Detecting your location</h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location will be displayed on the App and used for calculating real-time weather.
          </h3>
        </div>
      );
    }
  }
}

export default Weather;
