import React, { Component } from "react";

class Message extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      selectedCountry: "",
      totalDeaths: 0,
      totalConfirmed: 0,
      recovered: 0,
    };
  }

  componentDidMount() {
    this.getCountries();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCountryDetails(code) {
    fetch("https://corona-api.com/countries/" + code)
      .then((res) => res.json())
      .then((result) => {
        const currentState = {
          selectedCountry: result.data.name,
          totalDeaths: result.data.latest_data.deaths,
          totalConfirmed: result.data.latest_data.confirmed,
          recovered: result.data.latest_data.recovered,
        };
        this.setState(currentState);
      })
      .catch((err) => {
        console.log(err);
        this.resetState();
      });
  }

  resetState() {
    this.setState({
      selectedCountry: "",
      totalDeaths: 0,
      totalConfirmed: 0,
      recovered: 0,
    });
  }

  getCountries() {
    fetch("https://corona-api.com/countries")
      .then((res) => res.json())
      .then((result) => {
        const countries = [];
        result.data.forEach((country) => {
          countries.push({
            name: country.name,
            code: country.code,
          });
        });
        this.setState({
          countries: countries,
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <h1>Covid-19 Details</h1>
        <select
          placeholder="Select country"
          onChange={(e) => this.getCountryDetails(e.target.value)}
        >
          <option value=""></option>
          {this.state.countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <h3>Country: {this.state.selectedCountry}</h3>
        <h3>Total Deaths: {this.state.totalDeaths}</h3>
        <h3>Total Confirmed: {this.state.totalConfirmed}</h3>
        <h3>Recovered: {this.state.recovered}</h3>
      </div>
    );
  }
}

export default Message;
