import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/store.js";

type HistoryProps = {
  history: array;
};
type HistoryState = {};
class History extends React.Component<HistoryProps, HistoryState> {
  state: HistoryState = {};
  render() {
    return (
      <div>
        <h3>History</h3>
        {this.props.history.map((city: object, index: number) => {
          return (
            <div key={city.location.name} id={`city${index}`} className="city">
              {city.location.name}, {city.location.country}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  history: state.history.results,
});

export default connect(mapStateToProps)(History);
