import React from 'react'
import Blockcopy from "./Blockcopy";
import { useDrop } from "react-dnd";
import { useState, useEffect, useContext } from 'react';
import { Reorder} from "framer-motion"
import Context from "./Context";


function ControlBlock(props) {
  const [keyVal, setKeyVal] = useContext(Context);
  const [innerBlock, setInnerBlock] = useState([])

  let count = 1
// adding the component into the inner list of for loop and updating it into the board list
  useEffect(() => {
    let inner = []
    for (let i = 0; i < innerBlock.length; i++) {
      inner.push({ onTap: innerBlock[i].onTap, action: innerBlock[i].action, key: innerBlock[i].key })
    }

    props.setInlist((prv) => {
      const index = prv.findIndex(object => {
        return object.key === props.id;
      });
      console.log("innerbox, board", index, prv)
      prv[index].array = inner
      return ([...prv])
    })
    // setInnerBlock(inner)
    // console.log(innerBlocks, innerBlock)
  }, [innerBlock])

// drop function and updating the board
  const [{ isOver }, dropE] = useDrop(() => ({
    accept: ["insert", "replace", "replaceinto"],
    drop: (item) => addImageToBoard(item.props),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  const addImageToBoard = (ite) => {
    // console.log(ite)
    const temp = {
      func: ite.func,
      class: ite.class,
      operation: ite.operation,
      action: ite.item.action,
      onTap: ite.onTap,
      type: ite.type,
      array: ite.item.array

    }
    count += 1
    setInnerBlock((prv) => {
      // console.log(temp)
      return ([...prv, { ...temp, key: (props.id) * 1000 + count }])
    })

  }
// handeling delete, element gets deleted when del is pressed
  useEffect(() => {
    const listener = event => {
      if (event.code === "Delete") {
        if (keyVal.block > 999 && props.spriteIndex === keyVal.index) {

          setInnerBlock((prv) => {
            let newArr = prv.filter(object => {
              return object.key !== keyVal.block
            })
            return ([...newArr])
          })
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [keyVal]);

// updating the values in board
  function handleChange(event) {
    const value = Number(event.target.value.replace(/\D/g, ''))
    // console.log(value)

    props.setBoard((prv) => {
      const index = prv.findIndex(object => {
        return object.key === props.id;
      })

      prv[index].repeat = value
      return ([...prv])
    });
  }

  return (
    <div ref={dropE} className={`${props.class}  min-h-20 rounded-lg border-2 shadow-lg flex flex-col`}

      onClick={() => {
        {
          setKeyVal(props.id)
        }
        // console.log(keyVal)
      } }  >
      <div className='flex flex-row items-center '>
        <div className=' text-lg '>{props.operation}</div>
        <input onChange={handleChange} placeholder="5" type="text" className='text-blue-900   ml-20  w-12 h-5  border-rounded rounded-xl'></input></div>

      <Reorder.Group axis="y" values={innerBlock} onReorder={setInnerBlock} >
        {innerBlock.map((item) => (
          <Reorder.Item key={item.key} value={item} drag className=" flex-row  content-center">
            <Blockcopy id={item.key} class={` items-end ml-10 ${item.class}`} operation={item.operation} setFlow={props.setFlow} spriteIndex={props.spriteIndex}
              type={"replaceinto"} action={item.action} setInnerBlock={setInnerBlock} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}

export default ControlBlock
