import "./specialbouquet.css";
import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import html2canvas from "html2canvas";

const RightSide = ({ cart, setCart }) => {
  const [board, setBoard] = useState([]);
  const [flower, setFlower] = useState([]);
  const [priceImage, setPriceImage] = useState(0);
  const [price, setPrice] = useState(0);
  const boardRef = useRef(null);

  const PriceDropImage = ({ prevPriceImage }) => {
    return prevPriceImage + 2;
  };

  const PriceDrop = ({ prevPrice }) => {
    return prevPrice + 3;
  };

  const [, drop] = useDrop(() => ({
    accept: "back",
    drop: (box) => {
      addBackToBoard(box);
    },
  }));

  const [, dropFlower1] = useDrop(() => ({
    accept: "image",
    drop: (item) => {
      addImageToBoard(item);
    },
  }));

  const addBackToBoard = (box) => {
    setBoard([...board, box]);
    setPrice((prevPrice) => PriceDrop({ prevPrice }));
  };

  const addImageToBoard = (item) => {
    setFlower((prevFlowers) => [...prevFlowers, item]);
    setPrice((prevPriceImage) => PriceDropImage({ prevPriceImage }));
  };

  const addToCart = () => {
    html2canvas(boardRef.current).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const newCartItem = {
        id: Date.now(),
        price: priceImage + price,
        quantity: 1,
        imageUrl: image,
      };

      setCart((prevCart) => [...prevCart, newCartItem]);
    });
  };

  return (
    <section>
      <div className="bouquet">
        <p>Special bouquet</p>
      </div>
      <div className="PriceSpecial">Price: {priceImage + price}$</div>
      <div ref={boardRef} className="ssImage">
        <div ref={drop} className="boardBouquete">
          {board.map((box, index) => (
            <img key={index} src={box.src} alt={box.alt} />
          ))}
        </div>
        <div ref={dropFlower1} className="boardFlower">
          <div className="flowerSize">
            {flower.map((item, index) => (
              <img key={index} src={item.src} alt={item.alt} />
            ))}
          </div>
        </div>
      </div>
      <button className="BuyNowSpecail" onClick={addToCart}>
        Buy Now
      </button>
    </section>
  );
};
export default RightSide;
