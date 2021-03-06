/* eslint-disable no-const-assign */
import React from "react";
import { Input, IconButton, Icon } from "rsuite";
import uuid from "react-uuid";

const HeaderLinksPopup = (props) => {
  const {
    headerLinks,
    setHeaderLinks,
    setNumOfHeaderLinks,
    setHeaderLinksKey,
  } = props;
  let counter = 0;

  return (
    <>
      <h4 className="popup-header">Header Links</h4>

      {headerLinks.map((link) => {
        counter++;
        setNumOfHeaderLinks(counter);
        return (
          <div className="popup-field" key={uuid()}>
            <Input defaultValue={link} name={`link-${counter}`} />
          </div>
        );
      })}
      <div style={{ position: "absolute", right: "15px" }}>
        <IconButton
          style={{ margin: "5px", border: "1px solid #e5e5ea" }}
          icon={<Icon icon="plus" />}
          size="md"
          onClick={() => {
            headerLinks.push("");
            setHeaderLinks(headerLinks);
            setHeaderLinksKey(uuid());
          }}
        />
        <IconButton
          style={{ margin: "5px", border: "1px solid #e5e5ea" }}
          icon={<Icon icon="minus" />}
          size="md"
          onClick={() => {
            headerLinks.pop();
            setHeaderLinks(headerLinks);
            setHeaderLinksKey(uuid());
          }}
        />
      </div>
    </>
  );
};

export default HeaderLinksPopup;
