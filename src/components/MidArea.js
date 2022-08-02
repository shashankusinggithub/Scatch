import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import Blockcopy from "./Blockcopy";
import { Reorder} from "framer-motion"
import ControlBlocks from "./ControlBlocks"
import Context from "./Context";

export default function MidArea(props) {
  
  const [keyVal, setKeyVal] = useContext(Context)  
  const [board, setBoard] = useState([])
  const [count, setCount] = useState({count:1})
  
// deleting elements in midArea when ever the element is clicked and delete button is pressed
  useEffect(() => {
    const listener = event => {
      if (event.code === "Delete") {        
        setBoard((prv) => {
          let newArr
          if (keyVal < 1000)
          {prv = prv.filter(object => {
            return object.key !== keyVal;
          });}
          else{
            let prekey = Math.round(keyVal/1000)
            newArr = prv
            const ind = prv.findIndex(object => {
              return object.key === prekey;
            });
            // console.log("Enter key was pressed. Run your function.", keyVal, prekey, ind);
            newArr = prv[ind].array.filter(object => {
              return object.key !== keyVal})  
            prv[ind].array = newArr          
            return ([...prv])

          }
          return ([...prv])
        })
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [keyVal]);


// updating the flow when ever board is updated
  useEffect(() => {
    let flowAdding = []
    // console.table(board, "flow")
    for (let i = 0; i < board.length; i++) {
      // console.log(board[i], i)
      // console.log(board[i].action)
      flowAdding.push({ onTap: board[i].onTap, action: board[i].action, array: board[i].array , repeat: board[i].repeat })
    }
    props.setFlow(flowAdding)
    // console.log(flowAdding, props.flow)
  }, [board])


  const [{ isOver, isOverCurrent }, drop, ] = useDrop(() => ({    
    accept: ["insert", "insertinto"],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }          
      addImageToBoard(item.props)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  })) 
  // temp is created with all the properties
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
      repeat: ite.item.repeat
    }
    let Counttemp 
    setCount((prv)=> {
      Counttemp = prv.count+1      
      return ({count: prv.count +1})})    
    // console.log("temp",temp.action, ite, Counttemp)  
    setBoard((prv) => {
      console.log(count, "count board", prv)
      return ([...prv, { ...temp, key: Counttemp}])
    })
  }

  return <div
    ref={drop} draggable={false} className="w-3/6 flex-none h-full  overflow-y-auto flex flex-col items-start  border-r border-gray-200 text-600 text-2xl font-bold p-5">
    {"Drop Blocks to Animate"}

    <Reorder.Group axis={"y" || "x"} values={board} id="midarea" className=" flex-row  py-4 -space-y-2" onReorder={setBoard}>
      {board.map((item) => (
        <Reorder.Item drag key={item.key} value={item}  >
          {item.type === "insertinto" &&  <ControlBlocks id={item.key} draggable={true} class={` items-start py-5 ${item.class}`} operation={item.operation} 
              setInlist={setBoard} />}
          {item.type === "insert" && <Blockcopy id={item.key} draggable={true} class={` items-center  ${item.class}`} operation={item.operation} action={item.action} // action is added just to avoid input div for event blocks
            setInlist={setBoard}/>}
        </Reorder.Item>
      ))}
    </Reorder.Group>

  </div>;
}
