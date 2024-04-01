import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { flowers } from "../../data.js";
import "./specialbouquet.css";

const ItemType = "FLOWER";

const Flower = ({
  flower,
  index,
  moveFlower,
  addToContainer,
  setDraggedItem,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && addToContainer) {
        addToContainer(item.index);
      }
      setDraggedItem(null);
    },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem, monitor) => {
      if (addToContainer) {
        setDraggedItem({ index, position: monitor.getClientOffset() });
      } else {
        moveFlower(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      className="Flower"
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img src={flower.imageUrl} alt={flower.name} />
    </div>
  );
};

// ...
const FlowerList = ({ flowers, onMoveFlower, addToContainer }) => {
  const moveFlower = (fromIndex, toIndex) => {
    onMoveFlower(fromIndex, toIndex);
  };

  const [draggedItem, setDraggedItem] = useState(null);

  return (
    <div className="FlowerList">
      {flowers.map((flower, index) => (
        <Flower
          key={flower.id}
          flower={flower}
          index={index}
          moveFlower={moveFlower}
          addToContainer={addToContainer}
          setDraggedItem={setDraggedItem}
        />
      ))}
      {draggedItem && (
        <div
          className="GhostFlower"
          style={{
            position: "absolute",
            top: draggedItem.position.y,
            left: draggedItem.position.x,
          }}
        >
          <img
            src={flowers[draggedItem.index].imageUrl}
            alt={flowers[draggedItem.index].name}
          />
        </div>
      )}
    </div>
  );
};

const Container = ({ flowersInContainer, setFlowersInContainer }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      const flowerToAdd = flowers[item.index];

      // Adaugă floarea în container la poziția specificată
      setFlowersInContainer((prevFlowers) => [
        ...prevFlowers,
        { ...flowerToAdd, position: item.position },
      ]);
    },
  });

  return (
    <div className="specialbouquet" ref={drop}>
      <div className="container_specialbouquet">
        <div className="container_grid">
          {flowersInContainer.map((flower, index) => {
            return (
              <div
                key={index}
                className="container_cell"
                style={flower.position}
              >
                <div className="container_frame">
                  <img
                    src={flower && flower.imageUrl ? flower.imageUrl : ""}
                    alt={flower && flower.name ? flower.name : ""}
                  />
                </div>
              </div>
            );
          })}
          {/* Adaugă casete goale cu chenar */}
          {Array.from({ length: 16 - flowersInContainer.length }).map(
            (_, index) => (
              <div
                key={`Empty-${flowersInContainer.length + index}`}
                className="container_cell empty-cell"
              >
                <div className="container-frame empty_frame"></div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ... (restul codului neschimbat)

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

// ...

const SpecialBouquet = () => {
  const [flowersState, setFlowersState] = useState([]);
  const [flowersInContainer, setFlowersInContainer] = useState([]);

  useEffect(() => {
    // Setează datele din JSON la încărcarea componentei
    setFlowersState(flowers);
  }, []);

  const moveFlower = (fromIndex, toIndex) => {
    const updatedFlowers = [...flowersState];
    const movedFlower = updatedFlowers[fromIndex];
    updatedFlowers.splice(fromIndex, 1);
    updatedFlowers.splice(toIndex, 0, movedFlower);
    setFlowersState(updatedFlowers);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <FlowerList flowers={flowersState} onMoveFlower={moveFlower} />
        {/* Partea dreapta a paginii pentru a lasa florile */}
        <Container
          flowersInContainer={flowersInContainer}
          setFlowersInContainer={setFlowersInContainer}
        />
      </div>
    </DndProvider>
  );
};

export default SpecialBouquet;
