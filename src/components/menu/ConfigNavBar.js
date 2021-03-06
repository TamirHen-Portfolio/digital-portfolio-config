import React, { useContext } from "react";
import uuid from "react-uuid";
import { Sidenav, Nav, Dropdown, IconButton, Icon } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { DataContext } from "../../providers/DataProvider";
import { updateDB } from "../../utils/Firebase";

import "./ConfigNavBar.css";

const ConfigNavBar = (props) => {
  const data = useContext(DataContext);
  const {
    rerenderPopup,
    displayPopup,
    setDisplayPopup,
    setCube,
    setHeaderText,
    setHeaderLinks,
    setHomepage,
    closePopup,
  } = props;
  let counter = 1;

  const panelStyles = {
    padding: "15px 20px",
    color: "#aaa",
    fontSize: "14px",
  };

  return (
    <>
      <div
        style={{
          minWidth: "250px",
          backgroundColor: "#f7f7fa",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "fixed",
            minWidth: "inherit",
            overflow: "auto",
            height: "100vh",
            paddingTop: "30px",
            paddingBottom: "50px",
          }}
        >
          <Sidenav activeKey="1">
            <Sidenav.Body>
              <Nav>
                {/* Configuration */}
                <Nav.Item
                  panel
                  style={{
                    padding: "15px 20px",
                    color: "#1675e0",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Configuration
                </Nav.Item>

                <Nav.Item panel style={panelStyles}>
                  Header
                </Nav.Item>

                {/* Header text */}
                <Nav.Item
                  eventKey={counter++}
                  className="nav-item"
                  icon={<Icon icon="pencil" />}
                  onClick={() => {
                    displayPopup && closePopup();
                    setHeaderText({
                      title: data.title,
                      subtitle: data.subtitle,
                    });
                    setDisplayPopup(true);
                    rerenderPopup();
                  }}
                >
                  Text
                </Nav.Item>

                {/* Header Links */}
                <Nav.Item
                  eventKey={counter++}
                  icon={<Icon icon="link" />}
                  onClick={() => {
                    displayPopup && closePopup();
                    setHeaderLinks(data.headerLinks);
                    setDisplayPopup(true);
                    rerenderPopup();
                  }}
                >
                  Links
                </Nav.Item>

                <Nav.Item panel style={panelStyles}>
                  Body
                </Nav.Item>

                {/* Cubes */}
                <Dropdown
                  eventKey={counter++}
                  title="Cubes"
                  icon={<Icon icon="cubes" />}
                >
                  {data.cubes.map((cube, index) => (
                    <Dropdown.Item
                      key={uuid()}
                      eventKey={`${counter}-${cube.name}`}
                      onClick={() => {
                        displayPopup && closePopup();
                        setCube({ ...cube, index: index });
                        setDisplayPopup(true);
                        rerenderPopup();
                      }}
                    >
                      {cube.name}
                    </Dropdown.Item>
                  ))}
                  <div style={{ padding: "5px 0px 5px 56px" }}>
                    <IconButton
                      style={{
                        marginRight: "5px",
                        border: "1px solid #e5e5ea",
                      }}
                      icon={<Icon icon="plus" />}
                      size="sm"
                      onClick={() => {
                        let cubes = data.cubes;
                        cubes.push({
                          id:
                            cubes.length === 0
                              ? 1
                              : cubes[cubes.length - 1].id + 1,
                          name: "New Cube",
                          description: "",
                          genre: "",
                          image: "",
                        });
                        updateDB("cubes", cubes);
                        closePopup();
                      }}
                    />
                    <IconButton
                      style={{ marginLeft: "5px", border: "1px solid #e5e5ea" }}
                      icon={<Icon icon="minus" />}
                      size="sm"
                      onClick={() => {
                        let cubes = data.cubes;
                        cubes.pop();
                        updateDB("cubes", cubes);
                        closePopup();
                      }}
                    />
                  </div>
                </Dropdown>

                {/* Pages */}
                <Dropdown
                  eventKey={counter++}
                  title="Pages"
                  icon={<Icon icon="web" />}
                >
                  <Dropdown.Menu title="Home" eventKey={`${counter}-home`}>
                    {Object.keys(data.pages.home).map((key) => {
                      return (
                        <Dropdown.Item
                          key={uuid()}
                          onClick={() => {
                            displayPopup && closePopup();
                            setHomepage(key);
                            setDisplayPopup(true);
                            rerenderPopup();
                          }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                  <Dropdown.Menu
                    title="Project"
                    eventKey={`${counter}-project`}
                  >
                    {Object.keys(data.pages.project).map((key) => {
                      return (
                        <Dropdown.Item key={uuid()}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                  <Dropdown.Menu
                    key={uuid()}
                    eventKey={`${counter}-hlink`}
                    title="Hlinks"
                  >
                    {data.pages.hlinks.map((hlink) => (
                      <Dropdown.Item key={uuid()}>{hlink.name}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Nav.Item panel style={panelStyles}>
                  Footer
                </Nav.Item>

                {/* Footer text */}
                <Nav.Item eventKey={counter++} icon={<Icon icon="pencil" />}>
                  Text
                </Nav.Item>

                <Nav.Item panel style={panelStyles}>
                  Settings
                </Nav.Item>

                <Dropdown
                  eventKey={counter++}
                  title="Break Points"
                  icon={<Icon icon="pc" />}
                >
                  {Object.keys(data.breakPoints).map((keyName) => (
                    <Dropdown.Item key={uuid()}>
                      {keyName.charAt(0).toUpperCase() + keyName.slice(1)}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      </div>
    </>
  );
};

export default ConfigNavBar;
