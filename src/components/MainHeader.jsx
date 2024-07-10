import { Link } from "react-router-dom";
import Image from "../images/blossomF.png";
import React from "react";

const MainHeader = () => {
  return (
    <header className="main_header">
      <div className="container_main_header">
        <div className="main_header_right">
          <div className="main_header_image">
            <img src={Image} alt="Main Header" />
          </div>
        </div>
        <div className="main_header_left">
          <h1>BOUTIQUE</h1>
          <p>No matter what kind of quote you're looking for,</p>
          <p>browsing through this list will definitely</p>
          <p>make you want to stop and smell the roses!</p>
          <Link to="/aboutus" className="btn lg">
            Read More
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
