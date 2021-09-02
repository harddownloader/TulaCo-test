import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/store";

interface NameInterfaces {
  fio: string;
  number: number;
  list: [number, string, object];
  list2: Array<number>;
}

const myFunc = (name: [object], number: []) => name.push(number);

type HistoryProps = {
  history: [object];
  selsius: boolean;
};
type HistoryState = {};
class History extends React.Component<HistoryProps, HistoryState> {
  // constructor(props: HistoryProps) {
  //   super(props)
  //   // this.myclass = new myclass()
  // }
  state: HistoryState = {};
  render() {
    return (
      <div>
        <h3>History</h3>
        {this.props.history.map((historyItem: object, indexHistory: number) => {
          return historyItem.map((city: object, index: number) => {
            return (
              <div
                key={city.location.name}
                id={`city${index}`}
                className="city"
              >
                {city.location.name}, {city.location.country} <br />
                {this.props.selsius
                  ? `${city.current.temp_c}C`
                  : `${city.current.temp_f}F`}
              </div>
            );
          });
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  history: state.history.results,
  selsius: state.units.selsius,
});

export default connect(mapStateToProps)(History);
