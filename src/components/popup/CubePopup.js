import React from "react";
import { Input } from "rsuite";

const CubePopup = (props) => {
  const { cube } = props;

  return (
    <>
      <h4 className="popup-header">Cube</h4>

      <div className="popup-field">
        <h6 className="popup-field-header">ID: </h6>
        <Input disabled defaultValue={cube.id} name="cubeId" />
      </div>
      <div className="popup-field">
        <h6 className="popup-field-header">Name: </h6>
        <Input defaultValue={cube.name} name="cubeName" />
      </div>
      <div className="popup-field">
        <h6 className="popup-field-header">Description: </h6>
        <Input
          componentClass="textarea"
          rows={3}
          defaultValue={cube.description}
          name="cubeDescription"
        />
      </div>
      <div className="popup-field">
        <h6 className="popup-field-header">Genre: </h6>
        <Input defaultValue={cube.genre} name="cubeGenre" />
      </div>
      <div className="popup-field">
        <h6 className="popup-field-header">Image URL: </h6>
        <Input defaultValue={cube.image} name="cubeImage" />
      </div>
    </>
  );
};

export default CubePopup;
