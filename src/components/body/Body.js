import React from "react";
import { Switch, Route } from "react-router-dom";
import uuid from "react-uuid";

import Home from "../../pages/Home";
import Project from "../../pages/Project";
import Grid from "../grid/Grid";
import TextBody from "./TextBody";
import GridScheme from "../grid/GridScheme";

const Body = (props) => {
  const { data } = props;

  return (
    <Switch>
      {data.pages.hlinks.map((hlink) => (
        <Route exact path={`/${hlink.name}`} key={uuid()}>
          <>
            {hlink.header && (
              <h4 style={{ margin: "50px, 0px, 30px, 0px" }}>{hlink.header}</h4>
            )}

            {hlink.grid && (
              <div style={{ position: "relative" }}>
                <GridScheme page="hlink" hlink={hlink} {...props} />
                <Grid page="hlink" hlink={hlink} {...props} />
              </div>
            )}
            {(hlink.title || hlink.subtitle || hlink.text) && (
              <TextBody
                title={hlink.title || ""}
                subtitle={hlink.subtitle || ""}
                text={hlink.text || ""}
                data={data}
              />
            )}
          </>
        </Route>
      ))}
      <Route exact path="/project/:cubeId">
        <Project {...props} />
      </Route>
      <Route path="/">
        <Home {...props} />
      </Route>
    </Switch>
  );
};

export default Body;
