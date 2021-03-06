/* eslint-disable eqeqeq */
import React from "react";
import { useMediaQuery } from "react-responsive";
import uuid from "react-uuid";

import Image from "../image/Image";

const Grid = (props) => {
  const { data, page, cubeId, hlink } = props;
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
  const images = data.pages[page]?.images;

  const style = {
    gallery: {
      display: "grid",
      gridTemplateRows: `repeat(${gridRows || 8}, 5vw)`,
      gridTemplateColumns: `repeat(${gridColumns || 8}, 1fr)`,
      gridGap: "15px",
      margin: "15px 0px",
    },
  };

  const pageRender = () => {
    switch (page) {
      case "hlink":
        return hlink.images?.map(
          (image) =>
            data.cubes.find((cube) => cube.id == image.cubeId) && (
              <Image
                key={uuid()}
                {...image}
                {...((isMobile && image.mobile) || (isTablet && image.tablet))}
                {...data.cubes.find((cube) => cube.id == image.cubeId)}
                page={page}
              />
            )
        );

      case "project":
        return images.map(
          (image) =>
            image.cubeId == cubeId && (
              <Image
                key={uuid()}
                {...image}
                {...((isMobile && image.mobile) || (isTablet && image.tablet))}
                {...data.cubes.find((cube) => cube.id == image.cubeId)}
                page={page}
              />
            )
        );

      default:
        //Homepage
        return images?.map(
          (image) =>
            data.cubes.find((cube) => cube.id == image.cubeId) && (
              <Image
                key={uuid()}
                {...image}
                {...((isMobile && image.mobile) || (isTablet && image.tablet))}
                {...data.cubes.find((cube) => cube.id == image.cubeId)}
                page={page}
              />
            )
        );
    }
  };

  return <div style={style.gallery}>{pageRender()}</div>;
};

export default Grid;
