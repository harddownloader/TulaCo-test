import React from "react";
import "./Game.scss";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addResult } from "../../store/History.js";
import { RootState } from "../../store/store.js";
import wcc from "world-countries-capitals";

type GameProps = {
  dispatch: Dispatch;
  history: array;
};
type GameState = {
  score: number;
  cities: array;
};
class Game extends React.Component<GameProps, GameState> {
  state: GameState = {
    score: 0,
    cities: [],
  };

  convertCelsiusToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  getCapital() {
    const randomCountryName = wcc.getRandomCountry();
    const getFullCountryInfo = wcc.getCountryDetailsByName(randomCountryName);
    const capital = getFullCountryInfo[0].capital;
    return capital;
  }

  async getWeather() {
    const capital = await this.getCapital();
    const res = await fetch(
      `${process.env.REACT_APP_API_WEATHER_URL}v1/current.json?key=${process.env.REACT_APP_API_WEATHER_KEY}&q=${capital}`
    ).then((response) => response.json());
    return res;
  }

  async loadCitiesInfo(count: number) {
    this.clearCitiesInfo();
    const result = [];
    for (let i = 0; i < count; i++) {
      const weathersCity = await this.getWeather();
      result.push(weathersCity);
    }
    return result;
  }

  clearCitiesInfo() {
    this.setState({ cities: [] });
  }

  componentDidMount() {
    this.loadCitiesInfo(2).then((citiesInfo) => {
      console.log("citiesInfo", citiesInfo);
      this.setState({ cities: [...citiesInfo] });
    });
  }

  render() {
    return (
      <div>
        <h1>Which city is hotter?</h1>
        <p>Score: {this.state.score}</p>

        {this.state.cities.map((city: object, index: number) => {
          return (
            <button
              key={city.location.name}
              id={`city${index}`}
              className="city"
              onClick={() => this.props.dispatch(addResult(city))}
            >
              {city.location.name}, {city.location.country}
            </button>
          );
        })}

        <button>Next cities</button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  history: state.history.results,
});

export default connect(mapStateToProps)(Game);
