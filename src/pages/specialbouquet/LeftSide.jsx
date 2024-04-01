import React, { useState, useEffect } from "react";
import "./specialbouquet.css";
import whiteLily from "../../images/whiteLily.png";
import redLily from "../../images/redLily.png";
import yellowLily from "../../images/yellowLily.png";
import orangeChrysanthemum from "../../images/orangeChrysanthemum.png";
import pinkChrysanthemum from "../../images/pinkChrysanthemum.png";
import blueChrysanthemum from "../../images/blueChrysanthemum.png";
import redRose from "../../images/redRose.png";
import yellowRose from "../../images/yellowRose.png";
import whiteRose from "../../images/whiteRose.png";
import redTulpin from "../../images/redTulpin.png";
import violeteTulpin from "../../images/violeteTulpin.png";
import yellowTulpin from "../../images/yellowTulpin.png";
import blackBox from "../../images/blackBox.png";
import whiteBox from "../../images/whiteBox.png";
import redBox from "../../images/redBox.png";
import hartie1 from "../../images/hartie1.png";
import hartie2 from "../../images/hartie2.png";
import { MdArrowRight } from "react-icons/md";
import { MdArrowLeft } from "react-icons/md";
import { useDrag } from "react-dnd";
import { FaArrowDown } from "react-icons/fa";

const LeftSide = () => {
  const [lily, setLily] = useState(redLily);
  const [boxBack, setBox] = useState(redBox);
  const [chrysanthemum, setChrysanthemum] = useState(pinkChrysanthemum);
  const [rose, setRose] = useState(redRose);
  const [tulpin, setTulpin] = useState(redTulpin);
  const [hartie, setHartie] = useState(hartie1);
  const [showFlowersImages, setShowFlowersImages] = useState(false);
  const [showBackgroundImages, setShowBackgroundImages] = useState(true);

  const [{ isDraggingBox }, dragBox] = useDrag(
    () => ({
      type: "back",
      item: { type: "back", src: boxBack, alt: "box" },
      collect: (monitor) => ({
        isDraggingBox: !!monitor.isDragging(),
      }),
    }),
    [boxBack]
  );

  const [{ isDraggingHartie }, dragHartie] = useDrag(
    () => ({
      type: "back",
      item: { type: "back", src: hartie, alt: "hartie" },
      collect: (monitor) => ({
        isDraggingHartie: !!monitor.isDragging(),
      }),
    }),
    [hartie]
  );

  const [{ isDraggingLily }, dragLily] = useDrag(
    () => ({
      type: "image",
      item: { type: "image", src: lily, alt: "lily" },
      collect: (monitor) => ({
        isDraggingLily: !!monitor.isDragging(),
      }),
    }),
    [lily]
  );

  const [{ isDraggingRose }, dragRose] = useDrag(
    () => ({
      type: "image",
      item: { type: "image", src: rose, alt: "rose" },
      collect: (monitor) => ({
        isDraggingRose: !!monitor.isDragging(),
      }),
    }),
    [rose]
  );

  const [{ isDraggingTulpin }, dragTulpin] = useDrag(
    () => ({
      type: "image",
      item: { type: "image", src: tulpin, alt: "tulpin" },
      collect: (monitor) => ({
        isDraggingTulpin: !!monitor.isDragging(),
      }),
    }),
    [tulpin]
  );

  const [{ isDraggingChrysanthemum }, dragChrysanthemum] = useDrag(
    () => ({
      type: "image",
      item: { type: "image", src: chrysanthemum, alt: "chrysanthemum" },
      collect: (monitor) => ({
        isDraggingChrysanthemum: !!monitor.isDragging(),
      }),
    }),
    [chrysanthemum]
  );

  const flowersImages = () => {
    setShowFlowersImages(!showFlowersImages);
    setShowBackgroundImages(false);
  };
  const backgroundImages = () => {
    setShowFlowersImages(false);
    setShowBackgroundImages(true);
  };

  const changeRedBox = () => {
    setBox(redBox);
  };

  const changeBlackBox = () => {
    setBox(blackBox);
  };

  const changeWhiteBox = () => {
    setBox(whiteBox);
  };

  const changeHartie1 = () => {
    setHartie(hartie1);
  };

  const changeHartie2 = () => {
    setHartie(hartie2);
  };

  const changeWhiteLily = () => {
    setLily(whiteLily);
  };

  const changeRedLily = () => {
    setLily(redLily);
  };

  const changeYellowLily = () => {
    setLily(yellowLily);
  };

  const changePinkChrysanthemum = () => {
    setChrysanthemum(pinkChrysanthemum);
  };
  const changeOrangeChrysanthemum = () => {
    setChrysanthemum(orangeChrysanthemum);
  };
  const changeBlueChrysanthemum = () => {
    setChrysanthemum(blueChrysanthemum);
  };

  const changeRedRose = () => {
    setRose(redRose);
  };

  const changeWhiteRose = () => {
    setRose(whiteRose);
  };
  const changeYellowRose = () => {
    setRose(yellowRose);
  };

  const changeRedTulpin = () => {
    setTulpin(redTulpin);
  };
  const changeVioleteTulpin = () => {
    setTulpin(violeteTulpin);
  };
  const changeYellowTulpin = () => {
    setTulpin(yellowTulpin);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="imContainer">
        {showFlowersImages ? (
          <div className="imageContainer">
            <div className="lilyImage">
              <div className="LilyP">
                <p>
                  Lily
                  <br />
                  2$
                </p>
              </div>
              <img ref={dragLily} className="imLily" src={lily} alt="Floare" />
              <button className="whitebut" onClick={changeWhiteLily}></button>
              <button className="redbut" onClick={changeRedLily}></button>
              <button className="yellowbut" onClick={changeYellowLily}></button>
            </div>
            <div className="chysanthemumImage">
              <div className="ChrysanthemumP">
                <p>Chrysanthemum</p>
                <div className="price">
                  <p>2$</p>
                </div>
              </div>
              <img
                ref={dragChrysanthemum}
                className="imChrysanthemum"
                src={chrysanthemum}
                alt="Floare"
              />
              <div className="buttonChrysanthemum">
                <button
                  className="pinkbut"
                  onClick={changePinkChrysanthemum}
                ></button>
                <button
                  className="orangebut"
                  onClick={changeOrangeChrysanthemum}
                ></button>
                <button
                  className="bluebut"
                  onClick={changeBlueChrysanthemum}
                ></button>
              </div>
            </div>
            <div className="roseImage">
              <div className="RoseP">
                <p>Rose</p>
                <div className="priceRose">
                  <p>2$</p>
                </div>
              </div>
              <img ref={dragRose} className="imRose" src={rose} />
              <div className="buttonRose">
                <button
                  className="whitebutRose"
                  onClick={changeWhiteRose}
                ></button>
                <button className="redbutRose" onClick={changeRedRose}></button>
                <button
                  className="yellowbutRose"
                  onClick={changeYellowRose}
                ></button>
              </div>
            </div>
            <div className="tulpinImage">
              <div className="TulpinP">
                <p>Tulpin</p>
                <div className="priceTulpin">
                  <p>2$</p>
                </div>
              </div>
              <img
                ref={dragTulpin}
                className="imTulpin"
                src={tulpin}
                alt="Floare"
              />
              <div className="buttonTulpin">
                <button
                  className="violetebutTulpin"
                  onClick={changeVioleteTulpin}
                ></button>
                <button
                  className="redbutTulpin"
                  onClick={changeRedTulpin}
                ></button>
                <button
                  className="yellowbutTulpin"
                  onClick={changeYellowTulpin}
                ></button>
              </div>
            </div>
            <button onClick={backgroundImages} className="backgroundButton">
              <MdArrowLeft />
            </button>
          </div>
        ) : (
          showBackgroundImages && (
            <div className="containerStart">
              {
                <div className="backgroundImages">
                  <div className="boxImage">
                    <img
                      ref={dragBox}
                      className="imBox"
                      src={boxBack}
                      alt="Box"
                    />
                    <div className="BoxP">
                      <p>Box</p>
                      <div className="priceBox">
                        <p>3$</p>
                      </div>
                    </div>

                    <div className="buttonBox">
                      <button
                        className="whitebutBox"
                        onClick={changeWhiteBox}
                      ></button>
                      <button
                        className="redbutBox"
                        onClick={changeRedBox}
                      ></button>
                      <button
                        className="blackbutBox"
                        onClick={changeBlackBox}
                      ></button>
                    </div>
                  </div>

                  <div className="hartieImage">
                    <img
                      ref={dragHartie}
                      className="imHartie"
                      src={hartie}
                      alt="hartie"
                    />

                    <div className="WrappingP">
                      <p>Wrapping</p>
                      <div className="priceWrapping">
                        <p>3$</p>
                      </div>
                    </div>
                    <div className="buttonHartie">
                      <button
                        className="redbutHartie1"
                        onClick={changeHartie1}
                      ></button>
                      <button
                        className="blackbutHartie2"
                        onClick={changeHartie2}
                      ></button>
                    </div>
                  </div>

                  <button onClick={flowersImages} className="flowersButton">
                    <MdArrowRight />
                  </button>
                </div>
              }
            </div>
          )
        )}
      </div>
      <div className="helpBouquet">HELP</div>
      <div
        className="arrowBouquet"
        onClick={scrollToBottom}
        style={{ cursor: "pointer" }}
      >
        <FaArrowDown />
      </div>
    </section>
  );
};
export default LeftSide;
