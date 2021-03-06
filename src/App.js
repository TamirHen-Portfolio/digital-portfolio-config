import React from "react";
import Application from "./Application";
import DataProvider from "./providers/DataProvider";

function App() {
  return (
    <DataProvider>
      <Application />
    </DataProvider>
  );
}

export default App;
