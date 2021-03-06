import React from "react";
import { useMediaQuery } from "react-responsive";
import uuid from "react-uuid";

const TextBody = (props) => {
  const { data, title, subtitle, text } = props;
  const { mobile } = data.breakPoints;
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobile || "600px"})`,
  });

  return (
    <div className="project-page-text" style={{ margin: "50px 0px" }}>
      <div className="text-title">
        <h4 style={{ fontSize: isMobile ? "16px" : "18px" }}>{title}</h4>
        <p style={{ fontSize: isMobile ? "14px" : "15px" }}>{subtitle}</p>
      </div>
      <div
        className="text-body"
        style={{ fontSize: isMobile ? "13px" : "15px", marginTop: "30px" }}
      >
        {text.split("\n").map((line) => (
          <p key={uuid()} className="text-line">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TextBody;
