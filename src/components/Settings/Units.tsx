import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setFahrenheit, setSelsius } from "../../store/Units";
import { RootState } from "../../store/store";

type UnitsProps = {
  dispatch: Dispatch;
  selsius: boolean;
};
type UnitsState = {};
class Units extends React.Component<UnitsProps, UnitsState> {
  state: UnitsState = {};
  render() {
    return (
      <div>
        <h3>Units</h3>
        <p>
          <input
            type="radio"
            name="units"
            id="units_selsius"
            defaultChecked={this.props.selsius}
            onClick={() => this.props.dispatch(setSelsius())}
          />
          <label htmlFor="units_selsius">Selsius</label>
        </p>

        <p>
          <input
            type="radio"
            name="units"
            id="units_fahrenheit"
            defaultChecked={!this.props.selsius}
            onClick={() => {
              this.props.dispatch(setFahrenheit());
            }}
          />
          <label htmlFor="units_fahrenheit">Fahrenheit</label>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  selsius: state.units.selsius,
});

export default connect(mapStateToProps)(Units);
