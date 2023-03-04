import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import Blockcopy from "./Blockcopy";
import { Reorder } from "framer-motion";
import ControlBlocks from "./ControlBlocks";
import Context from "./Context";

export default function MidArea(props) {
  const [keyVal, setKeyVal] = useContext(Context);
  const [board, setBoard] = useState([]);
  const [count, setCount] = useState({ count: 1 });

  // deleting elements in midArea when ever the element is clicked and delete button is pressed
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Delete") {
        setBoard((prv) => {
          console.log(prv, "delet try");
          if (keyVal.block < 1000 && props.spriteIndex === keyVal.index) {
            prv = prv.filter((object) => {
              return object.key !== keyVal.block;
            });
          }
          return [...prv];
        });
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [keyVal]);

  useEffect(() => {
    let flowAdding = [];
    for (let i = 0; i < board.length; i++) {
      flowAdding.push({
        onTap: board[i].onTap,
        action: board[i].action,
        array: board[i].array,
        repeat: board[i].repeat,
      });
    }
    props.setFlow((prv) => {
      let temp = [...prv];
      temp[props.spriteIndex].sequence = flowAdding;
      return temp;
    });
    console.log(flowAdding, props.flow);
  }, [board]);

  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: ["insert", "insertinto"],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      addImageToBoard(item.props);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  const addImageToBoard = (ite) => {
    // console.log(ite)
    const temp = {
      func: ite.func,
      class: ite.class,
      operation: ite.operation,
      action: ite.item.action,
      onTap: ite.item.onTap,
      type: ite.type,
      array: ite.item.array,
      repeat: ite.item.repeat,
    };
    let Counttemp;
    setCount((prv) => {
      Counttemp = prv.count + 1;
      return { count: prv.count + 1 };
    });
    // console.log("temp",temp.action, ite, Counttemp)
    setBoard((prv) => {
      console.log(count, "count board", prv);
      return [...prv, { ...temp, key: Counttemp }];
    });
  };

  return (
    <div
      ref={drop}
      draggable={false}
      className={`${
        props.activeSprite !== props.spriteIndex && "hidden"
      } flex-none h-screen relative overflow-y-auto flex flex-col items-start  border-r border-gray-200 text-600 text-2xl font-bold p-5`}
    >
      {"Drop Blocks to Animate"}

      <Reorder.Group
        axis={"y" || "x"}
        values={board}
        id="midarea"
        className=" flex-row z-50 py-4 -space-y-2"
        onReorder={setBoard}
      >
        {board.map((item) => (
          <Reorder.Item drag key={item.key} value={item}>
            {item.type === "insertinto" && (
              <ControlBlocks
                id={item.key}
                draggable={true}
                class={` items-start py-5 ${item.class}`}
                operation={item.operation}
                setFlow={props.setFlow}
                spriteIndex={props.spriteIndex}
                type={"replace"}
                flow={props.flow}
                board={board}
                setBoard={setBoard}
              />
            )}
            {item.type === "insert" && (
              <Blockcopy
                id={item.key}
                draggable={true}
                class={` items-center  ${item.class}`}
                operation={item.operation}
                setFlow={props.setFlow}
                action={item.action}
                spriteIndex={props.spriteIndex}
                type={"replace"}
                setBoard={setBoard}
              >
                {item.type}
              </Blockcopy>
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <img
        className="absolute top-6 right-0 h-20 opacity-50 z-0 "
        src={props.url}
      />
    </div>
  );
}
