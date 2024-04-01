// SectionHead.js
import React from "react";
import "./SectionHead.css";

const SectionHead = ({ title, subtitle, className }) => {
  return (
    <div className={`section_head ${className || ""}`}>
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </div>
  );
};

export default SectionHead;
