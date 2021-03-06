/* eslint-disable eqeqeq */
import React from "react";
import { useMediaQuery } from "react-responsive";

const Grid = (props) => {
  const { data, page, hlink } = props;
  const { mobile, tablet } = data.breakPoints;
  const isTablet = useMediaQuery({
    query: `(max-width: ${tablet || "1200px"})`,
  });
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobile || "600px"})`,
  });
  const gridRows = isTablet
    ? isMobile
      ? data.pages[page]?.grid.mobile?.rows || hlink?.grid.mobile?.rows
      : data.pages[page]?.grid.tablet?.rows || hlink?.grid.tablet?.rows
    : data.pages[page]?.grid.rows || hlink?.grid?.rows;
  const gridColumns = isTablet
    ? isMobile
      ? data.pages[page]?.grid.mobile?.columns || hlink?.grid.mobile?.columns
      : data.pages[page]?.grid.tablet?.columns || hlink?.grid.tablet?.columns
    : data.pages[page]?.grid.columns || hlink?.grid.columns;

  const style = {
    gallery: {
      display: "grid",
      gridTemplateRows: `repeat(${gridRows || 8}, 5vw)`,
      gridTemplateColumns: `repeat(${gridColumns || 8}, 1fr)`,
      gridGap: "15px",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
  };

  const setTable = () => {
    let table = new Array(gridRows);
    for (let i = 1; i <= gridRows; i++) {
      table[i] = new Array(gridColumns);
      for (let j = 1; j <= gridColumns; j++) {
        table[i][j] = (
          <div
            id={"div-" + i + "-" + j}
            key={i + j}
            style={{ border: "1px dashed black" }}
          >
            <p
              style={{
                position: "relative",
                left: "2px",
                top: "0px",
                fontSize: isMobile ? "8px" : isTablet ? "12px" : "14px",
                margin: "0px",
              }}
            >
              {`(${i},${j})`}
            </p>
          </div>
        );
      }
    }
    return table;
  };

  return <div style={style.gallery}>{setTable()}</div>;
};

export default Grid;
