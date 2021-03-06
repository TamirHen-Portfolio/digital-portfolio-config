import React, { Component, createContext } from "react";
import { db } from "../utils/Firebase";

export const DataContext = createContext({ data: null });
class DataProvider extends Component {
  state = {
    data: null,
  };

  componentDidMount = () => {
    db.on("value", (snapshot) => {
      this.setState({
        data: snapshot.val(),
      });
    });
  };

  render() {
    return (
      <DataContext.Provider value={this.state.data}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
export default DataProvider;
