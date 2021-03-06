import React, { useContext } from "react";
import { Input } from "rsuite";
import { DataContext } from "../../providers/DataProvider";

const ImagePositionInput = (props) => {
  const data = useContext(DataContext);
  const { index, isTablet, isMobile } = props;

  return (
    <>
      <div className="one-line-inputs">
        <Input
          className="one-line-item"
          defaultValue={
            isMobile
              ? data.pages.home.images[index]?.mobile?.rowStart
              : isTablet
              ? data.pages.home.images[index]?.tablet?.rowStart
              : data.pages.home.images[index]?.rowStart
          }
          name={`homepage${
            isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"
          }Image${index}-rowStart`}
          placeholder="Row Start"
        />
        X
        <Input
          className="one-line-item"
          defaultValue={
            isMobile
              ? data.pages.home.images[index]?.mobile?.columnStart
              : isTablet
              ? data.pages.home.images[index]?.tablet?.columnStart
              : data.pages.home.images[index]?.columnStart
          }
          name={`homepage${
            isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"
          }Image${index}-columnStart`}
          placeholder="Column Start"
        />
      </div>
      <div className="one-line-inputs">
        <Input
          className="one-line-item"
          defaultValue={
            (isMobile
              ? data.pages.home.images[index]?.mobile?.rowEnd
              : isTablet
              ? data.pages.home.images[index]?.tablet?.rowEnd
              : data.pages.home.images[index]?.rowEnd) - 1
          }
          name={`homepage${
            isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"
          }Image${index}-rowEnd`}
          placeholder="Row End"
        />
        X
        <Input
          className="one-line-item"
          defaultValue={
            (isMobile
              ? data.pages.home.images[index]?.mobile?.columnEnd
              : isTablet
              ? data.pages.home.images[index]?.tablet?.columnEnd
              : data.pages.home.images[index]?.columnEnd) - 1
          }
          name={`homepage${
            isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"
          }Image${index}-columnEnd`}
          placeholder="Column End"
        />
      </div>
    </>
  );
};

export default ImagePositionInput;
