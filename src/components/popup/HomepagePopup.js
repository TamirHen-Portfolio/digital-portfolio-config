import React, { useState, useContext } from "react";
import uuid from "react-uuid";
import { Input, Dropdown, Divider, IconButton, Icon } from "rsuite";
import { DataContext } from "../../providers/DataProvider";
import ImagePositionInput from "../image/ImagePositionInput";

const HomepagePopup = (props) => {
  const data = useContext(DataContext);
  const { homepage, images, setImages } = props;
  const cubes = data.cubes;
  const [imagesKey, setImagesKey] = useState(uuid());
  const [pickedImages, setPickedImages] = useState(
    images.map((image) => {
      return cubes.find((cube) => cube.id === image.cubeId).name;
    })
  );
  const [rerenderDropdown, setRerenderDropdown] = useState(uuid());

  return (
    <>
      <h4 className="popup-header">
        Homepage {homepage.charAt(0).toUpperCase() + homepage.slice(1)}
      </h4>

      {homepage === "grid" ? (
        <>
          <div className="popup-field">
            <h6 className="popup-field-header">Desktop: </h6>
            <div className="one-line-inputs">
              <Input
                className="one-line-item"
                defaultValue={data.pages.home.grid?.rows}
                name="homepageDesktopGridRows"
                placeholder="Rows"
              />
              X
              <Input
                className="one-line-item"
                defaultValue={data.pages.home.grid?.columns}
                name="homepageDesktopGridColumns"
                placeholder="Columns"
              />
            </div>
          </div>
          <div className="popup-field">
            <h6 className="popup-field-header">Tablet: </h6>
            <div className="one-line-inputs">
              <Input
                className="one-line-item"
                defaultValue={data.pages.home.grid?.tablet?.rows}
                name="homepageTabletGridRows"
                placeholder="Rows"
              />
              X
              <Input
                className="one-line-item"
                defaultValue={data.pages.home.grid?.tablet?.columns}
                name="homepageTabletGridColumns"
                placeholder="Columns"
              />
            </div>
          </div>
          <div className="popup-field">
            <h6 className="popup-field-header">Mobile: </h6>
            <div className="one-line-inputs">
              <Input
                className="one-line-item"
                defaultValue={data.pages.home.grid?.mobile?.rows}
                name="homepageMobileGridRows"
                placeholder="Rows"
              />
              X
              <Input
                className="one-line-item"
                defaultValue={data.pages.home.grid?.mobile?.columns}
                name="homepageMobileGridColumns"
                placeholder="Columns"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {images.map((image, index) => (
            <div key={imagesKey + index}>
              <div className="popup-field">
                <Divider style={{ margin: "0px 0px 5px 0px" }} />
                <div className="image-dropdown-wrapper">
                  <h5 className="popup-field-header centered">Image:</h5>
                  <Dropdown
                    title={pickedImages[index]}
                    name={"cubesDropdown" + index}
                    key={rerenderDropdown}
                  >
                    {cubes.map((cube) => {
                      return (
                        <Dropdown.Item
                          key={uuid()}
                          onClick={(event) => {
                            pickedImages[index] = event.target.textContent;
                            setPickedImages(pickedImages);
                            images[index].cubeId = cube.id;
                            setRerenderDropdown(uuid());
                          }}
                        >
                          {cube.name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown>
                </div>

                <h6 className="popup-field-header">Desktop: </h6>
                <ImagePositionInput index={index} />
              </div>
              <div className="popup-field">
                <h6 className="popup-field-header">Tablet: </h6>
                <ImagePositionInput index={index} isTablet={true} />
              </div>
              <div className="popup-field">
                <h6 className="popup-field-header">Mobile: </h6>
                <ImagePositionInput index={index} isMobile={true} />
              </div>
            </div>
          ))}
          <div style={{ position: "absolute", right: "15px" }}>
            <IconButton
              style={{ margin: "5px", border: "1px solid #e5e5ea" }}
              icon={<Icon icon="plus" />}
              size="md"
              onClick={() => {
                images.push({
                  cubeId: 1,
                  rowStart: 0,
                  rowEnd: 1,
                  columnStart: 0,
                  columnEnd: 1,
                  mobile: {
                    rowStart: 0,
                    rowEnd: 1,
                    columnStart: 0,
                    columnEnd: 1,
                  },
                  tablet: {
                    rowStart: 0,
                    rowEnd: 1,
                    columnStart: 0,
                    columnEnd: 1,
                  },
                });
                setImages(images);
                pickedImages.push(cubes[0].name || "Error");
                setPickedImages(pickedImages);
                setImagesKey(uuid());
              }}
            />
            <IconButton
              style={{ margin: "5px", border: "1px solid #e5e5ea" }}
              icon={<Icon icon="minus" />}
              size="md"
              onClick={() => {
                images.pop();
                setImages(images);
                pickedImages.pop();
                setPickedImages(pickedImages);
                setImagesKey(uuid());
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomepagePopup;
