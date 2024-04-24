import { SiOpenaigym } from "react-icons/si";

export const links = [
  {
    name: "Catalog",
    path: "/catalog",
  },

  {
    name: "Special Bouquet",
    path: "/specialbouquet",
  },
  {
    name: "About Us",
    path: "/aboutus",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Add Product",
    path: "/addProductAdmin",
  },
  {
    name: "Sing Up",
    path: "/singup",
  },
];

// data.js
// data.js

const products = [
  {
    id: 1,
    name: "Produs",
    info: "Buchet multicolor",
    price: 20,
    sales: 10,
    imageUrl: `buchet.png`,
  },
  {
    id: 2,
    name: "Produs",
    info: "Buchet trandafiri rosii",
    price: 30,
    sales: 15,
    imageUrl: `buchet2.png`,
  },
  {
    id: 3,
    name: "Produs",
    oinfo: "Buchet flori nunate de roz si mov",
    price: 25,
    sales: 8,
    imageUrl: `buchet3.png`,
  },
  {
    id: 4,
    name: "Produs",
    info: "Buchet multicolor",
    price: 15,
    sales: 20,
    imageUrl: `buchet4.png`,
  },
  {
    id: 5,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 12,
    imageUrl: `buchet5.png`,
  },
  {
    id: 6,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 7,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 8,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 9,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 10,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 11,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 12,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 13,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 14,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
  {
    id: 15,
    name: "Produs",
    info: "Buchet trandafiri roz si lalele",
    price: 40,
    sales: 1,
    imageUrl: `buchet5.png`,
  },
];

const flowers = [
  {
    id: 1,
    name: "trandafir",
    imageUrl: require("./images/whiteRose.png"),
    // Poza cu floarea
  },
  {
    id: 2,
    name: "lalea",
    imageUrl: require("./images/redTulpin.png"), // Poza cu floarea
  },
];

// Sortează produsele după cantitatea de vânzări în ordine descrescătoare
const topSellingProducts = products.sort((a, b) => b.sales - a.sales);

// Extrage primele 4 produse
const firstFourTopSellingProducts = topSellingProducts.slice(0, 4);

export { products, topSellingProducts, firstFourTopSellingProducts, flowers };

export const reviews = [
  {
    name: "Bogdan",
    review:
      "I recently ordered a bouquet from Blossom Boutique's website, and I couldn't be happier with the experience. The website was user-friendly, making it a breeze to browse and select the perfect arrangement. The flowers were delivered on time and were even more stunning in person. The recipient was absolutely delighted. I highly recommend this flower shop for their excellent service and beautiful blooms.",
    imageUrl: require("./images/boy.jpg"),
  },
  {
    name: "Lavinia",
    review:
      "Blossom Boutique's website made sending flowers a delight. The variety of bouquets and arrangements they offer is impressive, and the ordering process was seamless. What truly stood out was the quality of the flowers and the attention to detail in the packaging. The recipient commented on how fresh and fragrant the flowers were. I'll definitely be returning to this website for all my floral needs.",
    imageUrl: require("./images/girl.jpg"),
  },
  {
    name: "Bogdan",
    review:
      "When I needed to send flowers for a last-minute occasion, I turned to Blossom Boutique's website. Their same-day delivery option saved the day! Not only did they deliver on time, but the flowers were exquisite. The website's tracking feature kept me in the loop, and their customer support was quick to respond to my queries. A fantastic online flower shop with top-notch service.",
    imageUrl: require("./images/boy.jpg"),
  },
];

const Users = [
  {
    id: 1,
    username: "raluca",
    email: "existinguser@example.com",
    passwordHash: "hashedPassword123", // Parola trebuie să fie stocată sub formă de hash
  },
  // Alți utilizatori pot fi adăugați aici
];

export { Users };
