import React from "react";
import { Input } from "rsuite";

const HeaderTextPopup = (props) => {
  const { headerText } = props;

  return (
    <>
      <h4 className="popup-header">Header Text</h4>

      <div className="popup-field">
        <h6 className="popup-field-header">Title: </h6>
        <Input defaultValue={headerText.title} name="headerTextTitle" />
      </div>
      <div className="popup-field">
        <h6 className="popup-field-header">Subtitle: </h6>
        <Input defaultValue={headerText.subtitle} name="headerTextSubtitle" />
      </div>
    </>
  );
};

export default HeaderTextPopup;
