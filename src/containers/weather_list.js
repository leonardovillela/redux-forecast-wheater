import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const { name } = cityData.city;
    const temps = cityData.list.map(cityWeather => cityWeather.main.temp).map(temp => temp - 273);
    const pressures = cityData.list.map(cityWeather => cityWeather.main.pressure);
    const humidities = cityData.list.map(cityWeather => cityWeather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={temps} color="orange" unit="ºC"/></td>
        <td><Chart data={pressures} color="green" unit="hPa"/></td>
        <td><Chart data={humidities} color="black" unit="%"/></td>
      </tr>
    );
  }

  renderWeatherList() {
    return this.props.weather.map(this.renderWeather);
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
        <tr>
          <th>City</th>
          <th>Temperature (ºC)</th>
          <th>Pressure (hPa)</th>
          <th>Humidity (%)</th>
        </tr>
        </thead>
        <tbody>
          {this.renderWeatherList()}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
