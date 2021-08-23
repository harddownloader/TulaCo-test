import React from "react";
import Units from "./Units";
import History from "./History";

type SettingsProps = {};
type SettingsState = {};
class Settings extends React.Component<SettingsProps, SettingsState> {
  state: SettingsState = {};
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <Units />
        <History />
      </div>
    );
  }
}

export default Settings;
