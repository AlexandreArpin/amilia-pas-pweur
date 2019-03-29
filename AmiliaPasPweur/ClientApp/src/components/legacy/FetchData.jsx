import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor (props) {
    super(props);
    this.state = { forecasts: [], loading: true};

    fetch('api/SampleData/WeatherForecasts')
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      }).catch(function () {
          console.log("failed");
      });
  }

  static renderForecastsTable (forecasts) {
    return (
        <table className='collapse ba br2 b--black-10 pv2 ph3'>
        <thead>
            <tr className="striped--light-gray ">
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.dateFormatted}>
              <td className="striped--light-gray">{forecast.dateFormatted}</td>
              <td className="striped--light-gray">{forecast.temperatureC}</td>
              <td className="striped--light-gray">{forecast.temperatureF}</td>
              <td className="striped--light-gray">{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
