import React from "react";
import Grid from "../components/grid/Grid";
import GridScheme from "../components/grid/GridScheme";

const Home = (props) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <GridScheme page="home" {...props} />
        <Grid page="home" {...props} />
      </div>
    </>
  );
};

export default Home;
