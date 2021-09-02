import React from "react";
import "./Game.scss";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addResult } from "../../store/History";
import { RootState } from "../../store/store";
import wcc from "world-countries-capitals";

type GameProps = {
  dispatch: Dispatch;
  history: array;
  selsius: boolean;
};
type GameState = {
  score: number;
  cities: array;
  isShowNextBtn: boolean;
};
class Game extends React.Component<GameProps, GameState> {
  state: GameState = {
    score: 0,
    cities: [],
    isShowNextBtn: false,
  };

  private convertCelsiusToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  private getCapital() {
    const randomCountryName = wcc.getRandomCountry();
    const getFullCountryInfo: readonly [string, number] =
      wcc.getCountryDetailsByName(randomCountryName);
    console.log("getFullCountryInfo", getFullCountryInfo);
    const capital = getFullCountryInfo[0].capital;
    return capital;
  }

  private async getWeather() {
    const capital = await this.getCapital();
    const res = await fetch(
      `${process.env.REACT_APP_API_WEATHER_URL}v1/current.json?key=${process.env.REACT_APP_API_WEATHER_KEY}&q=${capital}`
    ).then((response) => response.json());
    return res;
  }

  private async loadCitiesInfo(count: number) {
    this.clearCitiesInfo();
    const result = [];
    for (let i = 0; i < count; i++) {
      const weathersCity = await this.getWeather();
      result.push(weathersCity);
    }
    return result;
  }

  private clearCitiesInfo() {
    this.setState({ cities: [] });
  }

  componentDidMount() {
    this.loadCitiesInfo(2).then((citiesInfo) => {
      this.setState({ cities: [...citiesInfo] });
    });
  }

  private userChoiceHandler(number: number) {
    this.setState({ isShowNextBtn: true });
    const anotherNumber = Number(Boolean(!number));
    const citiesTmp: [string] = this.state.cities;
    // хочу превратить 2 объекта в массиве
    // в 2 массива в массиве
    const cities = citiesTmp.map((city: object) => {
      return [...city];
    });
    if (cities[number].temp_c > cities[anotherNumber].temp_c) {
      cities[number].userChoisedIt = true;
      cities[anotherNumber].userChoisedIt = false;
    } else {
      cities[number].userChoisedIt = false;
      cities[anotherNumber].userChoisedIt = true;
    }
    console.log("cities", cities);
    this.props.dispatch(addResult(cities));
  }

  private startNextRound() {
    this.setState({ isShowNextBtn: false });
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
              onClick={() => this.userChoiceHandler(index)}
            >
              {city.location.name}, {city.location.country}
              <br />
              {this.state.isShowNextBtn
                ? this.props.selsius
                  ? `${city.current.temp_c}C`
                  : `${city.current.temp_f}F`
                : null}
            </button>
          );
        })}

        {this.state.isShowNextBtn ? (
          <button onClick={() => this.startNextRound()}>Next cities</button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  history: state.history.results,
  selsius: state.units.selsius,
});

export default connect(mapStateToProps)(Game);
