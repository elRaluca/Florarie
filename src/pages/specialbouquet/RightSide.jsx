import "./specialbouquet.css";
import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import html2canvas from "html2canvas";
import { getUserIdFromToken } from "../productdetail/getUserIdFromToken";

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
      const image = canvas.toDataURL("image/png"); // Aceasta este imaginea in format base64
      saveBouquet(image, price); // Trimite imaginea și prețul la backend
    });
  };

  const saveBouquet = async (image, price) => {
    const formData = new FormData();
    formData.append(
      "specialBouquet",
      new Blob(
        [
          JSON.stringify({
            priceBouquet: price,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    formData.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:8060/user/createSpecialBouquet",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Bouquet saved successfully");
        addBouquetToCart(data.id, 1); // Assuming data.id is the ID of the newly saved bouquet
      } else {
        throw new Error("Failed to save bouquet");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addBouquetToCart = async (bouquetId, quantity) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error("User ID is null, user might not be logged in.");
      // Consider redirecting to login or showing a message
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8060/user/addSpecialBouquet?userId=${userId}&specialBouquetId=${bouquetId}&quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are using token-based authentication
          },
        }
      );
      if (!response.ok) {
        const message = await response.text(); // or response.json() if response is in JSON format
        throw new Error("Failed to add bouquet to cart: " + message);
      }
      console.log("Bouquet added to cart successfully");
    } catch (error) {
      console.error("Error adding bouquet to cart:", error);
    }
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
