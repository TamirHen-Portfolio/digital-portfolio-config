import React, { useState, useContext } from "react";
import Header from "./components/menu/Header";
import Body from "./components/body/Body";
import Footer from "./components/menu/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DataContext } from "./providers/DataProvider";
import ConfigNavBar from "./components/menu/ConfigNavBar";
import Popup from "./components/popup/Popup";
import uuid from "react-uuid";

function App() {
  const data = useContext(DataContext);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [cube, setCube] = useState(null);
  const [headerText, setHeaderText] = useState(null);
  const [headerLinks, setHeaderLinks] = useState(null);
  const [popupKey, setPopupKey] = useState(uuid());
  const [homepage, setHomepage] = useState(null);

  const style = {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "100vh",
      width: "100%",
      position: "relative",
    },
  };

  const rerenderPopup = () => {
    setPopupKey(uuid());
  };

  const onClosePopup = () => {
    setDisplayPopup(false);
    setCube(null);
    setHeaderText(null);
    setHeaderLinks(null);
    setHomepage(null);
  };

  return (
    <>
      {data ? (
        <>
          <div style={{ display: "flex" }}>
            <ConfigNavBar
              data={data}
              displayPopup={displayPopup}
              setDisplayPopup={setDisplayPopup}
              cube={cube}
              setCube={setCube}
              setHeaderText={setHeaderText}
              setHeaderLinks={setHeaderLinks}
              setHomepage={setHomepage}
              rerenderPopup={rerenderPopup}
              closePopup={onClosePopup}
            />
            <Router>
              <Switch>
                <>
                  <div className="main-container" style={style.mainContainer}>
                    {displayPopup && (
                      <Popup
                        key={popupKey}
                        cube={cube}
                        headerText={headerText}
                        headerLinks={headerLinks}
                        setHeaderLinks={setHeaderLinks}
                        homepage={homepage}
                        onClose={onClosePopup}
                      />
                    )}
                    <div style={{ padding: "0px 6.94%" }}>
                      <Header data={data} />
                      <Route path="/">
                        <Body data={data} />
                      </Route>
                    </div>
                    <Footer data={data} />
                  </div>
                </>
              </Switch>
            </Router>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
