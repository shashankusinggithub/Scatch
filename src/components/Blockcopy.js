import React from "react";
import { useEffect, useContext } from "react";
import { useDrag } from "react-dnd";
import { motion, useMotionValue, useVelocity } from "framer-motion";
import Context from "./Context";

function Blockcopy(props) {
  const [keyVal, setKeyVal] = useContext(Context);

  // handles the changes and updates into the board
  function handleChange(event) {
    const value = Number(event.target.value.replace(/\D/g, ""));
    props.setBoard((prv) => {
      let newArr = [...prv];
      const index = newArr.findIndex((object) => {
        // console.log("index props", props.id)
        return object.key === props.id;
      });
      // console.log("index", index)
      {
        if (newArr[index].func == "move fw") {
          let temp = { x: value, y: 0, rotate: 0 };
          newArr[index].action = temp;
        } else if (newArr[index].func == "move bw") {
          let temp = { x: -1 * value, y: 0, rotate: 0 };
          newArr[index].action = temp;
        } else if (newArr[index].func == "move up") {
          let temp = { x: value, y: -1 * value, rotate: 0 };
          newArr[index].action = temp;
        } else if (newArr[index].func == "move dwn") {
          let temp = { x: 0, y: value, rotate: 0 };
          newArr[index].action = temp;
        } else if (newArr[index].func == "rotateAntiClock") {
          let temp = { x: 0, y: 0, rotate: -1 * value };
          newArr[index].action = temp;
        } else if (newArr[index].func == "rotateClockWise") {
          let temp = { x: 0, y: 0, rotate: value };
          newArr[index].action = temp;
        }

        // console.log(newArr[index - 1], newArr[index], newArr[index + 1], "board")
        return newArr;
      }
    });
  }

  return (
    <motion.div
      id="block"
      //  onFocus={()=> console.log("captured", props.id)}
      className={`  ${props.class} h-11 items-center rounded-lg border-2 `}
      onClick={(event) => {
        setKeyVal({ index: props.spriteIndex, block: props.id });
        // console.log(keyVal)
        event.stopPropagation();
      }}
      type={"replace"}
    >
      <div className="mr-4 items-center">{props.operation}</div>
      <span>
        {props.action && (
          <input
            onChange={handleChange}
            className="shadow-lg text-blue-900  w-16 h-5     rounded-xl"
            type="text"
            placeholder="200"
          ></input>
        )}
      </span>
    </motion.div>
  );
}

export default Blockcopy;
