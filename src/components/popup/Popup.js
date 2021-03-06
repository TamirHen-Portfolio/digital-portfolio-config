import React, { useState, useContext } from "react";
import { Button } from "rsuite";
import { updateDB } from "../../utils/Firebase";
import uuid from "react-uuid";
import { DataContext } from "../../providers/DataProvider";

import "./Popup.css";
import CubePopup from "./CubePopup";
import HeaderTextPopup from "./HeaderTextPopup";
import HeaderLinksPopup from "./HeaderLinksPopup";
import HomepagePopup from "./HomepagePopup";

const Popup = (props) => {
  const data = useContext(DataContext);
  const {
    onClose,
    cube,
    headerText,
    headerLinks,
    setHeaderLinks,
    homepage,
  } = props;
  const [numOfHeaderLinks, setNumOfHeaderLinks] = useState(0);
  const [headerLinksKey, setHeaderLinksKey] = useState(uuid());
  const [images, setImages] = useState(data.pages.home.images);

  const submit = (event) => {
    event.preventDefault();
    let fields = {};
    if (cube) {
      fields = {
        id: cube.id,
        name: event.target.cubeName.value,
        description: event.target.cubeDescription.value,
        genre: event.target.cubeGenre.value,
        image: event.target.cubeImage.value,
      };
      updateDB(`cubes/${cube.index}`, fields) === "saved" && onClose();
      return;
    } else if (headerText) {
      fields = {
        title: event.target.headerTextTitle.value,
        subtitle: event.target.headerTextSubtitle.value,
      };
      updateDB("title", fields.title) === "saved" &&
        updateDB("subtitle", fields.subtitle) === "saved" &&
        onClose();
      return;
    } else if (headerLinks) {
      fields = [];
      for (let index = 1; index <= numOfHeaderLinks; index++) {
        fields.push(event.target[`link-${index}`].value);
      }
      updateDB("headerLinks", fields) === "saved" && onClose();
      return;
    } else if (homepage) {
      if (homepage === "grid") {
        fields = {
          rows: parseInt(event.target.homepageDesktopGridRows.value),
          columns: parseInt(event.target.homepageDesktopGridColumns.value),
          tablet: {
            rows: parseInt(event.target.homepageTabletGridRows.value),
            columns: parseInt(event.target.homepageTabletGridColumns.value),
          },
          mobile: {
            rows: parseInt(event.target.homepageMobileGridRows.value),
            columns: parseInt(event.target.homepageMobileGridColumns.value),
          },
        };
        updateDB("pages/home/grid", fields) && onClose();
      } else {
        let index = 0;
        images.forEach((image) => {
          image.rowStart =
            Number(
              event.target[`homepageDesktopImage${index}-rowStart`].value
            ) || 0;
          image.rowEnd =
            Number(event.target[`homepageDesktopImage${index}-rowEnd`].value) +
              1 || 0;
          image.columnStart =
            Number(
              event.target[`homepageDesktopImage${index}-columnStart`].value
            ) || 0;
          image.columnEnd =
            Number(
              event.target[`homepageDesktopImage${index}-columnEnd`].value
            ) + 1 || 0;

          image.tablet.rowStart =
            Number(
              event.target[`homepageTabletImage${index}-rowStart`].value
            ) || 0;
          image.tablet.rowEnd =
            Number(event.target[`homepageTabletImage${index}-rowEnd`].value) +
              1 || 0;
          image.tablet.columnStart =
            Number(
              event.target[`homepageTabletImage${index}-columnStart`].value
            ) || 0;
          image.tablet.columnEnd =
            Number(
              event.target[`homepageTabletImage${index}-columnEnd`].value
            ) + 1 || 0;

          image.mobile.rowStart =
            Number(
              event.target[`homepageMobileImage${index}-rowStart`].value
            ) || 0;
          image.mobile.rowEnd =
            Number(event.target[`homepageMobileImage${index}-rowEnd`].value) +
              1 || 0;
          image.mobile.columnStart =
            Number(
              event.target[`homepageMobileImage${index}-columnStart`].value
            ) || 0;
          image.mobile.columnEnd =
            Number(
              event.target[`homepageMobileImage${index}-columnEnd`].value
            ) + 1 || 0;

          index++;
        });
        updateDB("pages/home/images", images) && onClose();
      }
      return;
    }
  };

  return (
    <div className="popup-background">
      <form className="popup" onSubmit={submit}>
        <div className="close-button" onClick={onClose}>
          X
        </div>
        {cube && <CubePopup cube={cube} />}
        {headerText && <HeaderTextPopup headerText={headerText} />}
        {headerLinks && (
          <HeaderLinksPopup
            key={headerLinksKey}
            headerLinks={headerLinks}
            setHeaderLinks={setHeaderLinks}
            numOfHeaderLinks={numOfHeaderLinks}
            setNumOfHeaderLinks={setNumOfHeaderLinks}
            setHeaderLinksKey={setHeaderLinksKey}
          />
        )}
        {homepage && (
          <HomepagePopup
            homepage={homepage}
            images={images}
            setImages={setImages}
          />
        )}
        <div className="save-button-wrapper">
          <Button type="submit" className="save-button" color="blue">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
