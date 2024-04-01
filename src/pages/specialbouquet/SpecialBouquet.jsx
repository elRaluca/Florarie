import LeftSide from "./LeftSide.jsx";
import RightSide from "./RightSide.jsx";
import "./specialbouquet.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React from "react";
import videoBuchet from "../../video/helpBuchet.mp4";
import "./specialbouquet.css";

const SpecialBouquet = ({ cart, setCart }) => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="containerBouquet">
          <LeftSide />
          <RightSide cart={cart} setCart={setCart} />

          <div className="videoContainer">
            <h1>Discover how to create a special bouquet!</h1>
            <h2>
              Watch our tutorial
              <br /> video now.
            </h2>
            <video controls>
              <source src={videoBuchet} type="video/mp4" />
              Browserul tău nu suportă elementul video.
            </video>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default SpecialBouquet;
