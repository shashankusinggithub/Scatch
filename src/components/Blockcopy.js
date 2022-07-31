import React from 'react'
import { useEffect, useContext } from 'react';
import { useDrag } from "react-dnd";
import { motion, useMotionValue, useVelocity } from "framer-motion"
import Context from "./Context";




function Blockcopy(props) {
  const [keyVal, setKeyVal] = useContext(Context);

  function handleChange(event) {
    const value = Number(event.target.value.replace(/\D/g, ''));



    if (props.id < 1000) {
      props.setBoard((prv) => {
        let newArr = [...prv]
        const index = newArr.findIndex(object => {
          // console.log("index props", props.id)
          return object.key === props.id;
        });

        // console.log("index", index)


        {
          if (newArr[index].func == "move fw") {

            let temp = { x: value, y: 0, rotate: 0 }
            newArr[index].action= temp
          }
          else if (newArr[index].func == "move bw") {

            let temp = { x: -1 * value, y: 0, rotate: 0 }
            newArr[index].action= temp
          }
          else if (newArr[index].func == "move up") {
            let temp = { x: value, y: -1 * value, rotate: 0 }
            newArr[index].action= temp
          }
          else if (newArr[index].func == "move dwn") {
            let temp = { x: 0, y: value, rotate: 0 }
            newArr[index].action= temp
          }
          else if (newArr[index].func == "rotateAntiClock") {
            let temp = { x: 0, y: 0, rotate: -1 * value }
            newArr[index].action = temp
          }
          else if (newArr[index].func == "rotateClockWise") {
            let temp = { x: 0, y: 0, rotate: value }
            newArr[index].action = temp
          }

          // console.log(newArr[index - 1], newArr[index], newArr[index + 1], "board")
          return (newArr)
        }
      })
    }

    else {
      props.setInnerBlock((prv) => {
        const index = newArr.findIndex(object => {
          return object.key === props.id;
        });
        let newArr = [...prv]
        // console.log(newArr[index])


        {
          if (newArr[index].func == "move fw") {

            let temp = { x: value, y: 0, rotate: 0 }
            newArr[index].action.x = temp
          }
          else if (newArr[index].func == "move bw") {

            let temp = { x: -1 * value, y: 0, rotate: 0 }
            newArr[index].action.x = temp
          }
          else if (newArr[index].func == "move up") {
            let temp = { x: value, y: -1 * value, rotate: 0 }
            newArr[index].action.y = temp
          }
          else if (newArr[index].func == "move dwn") {
            let temp = { x: 0, y: value, rotate: 0 }
            newArr[index].action.y = temp
          }
          else if (newArr[index].func == "rotateAntiClock") {
            let temp = { x: 0, y: 0, rotate: -1 * value }
            newArr[index].action.rotate = temp
          }
          else if (newArr[index].func == "rotateClockWise") {
            let temp = { x: 0, y: 0, rotate: value }
            newArr[index].action.rotate = temp
          }

          // console.log(newArr, "board")
          return ([...newArr])
        }
      })
    }
  }

  // console.log(props.action, "action")

  return (

    <motion.div id="block"

      //  onFocus={()=> console.log("captured", props.id)}
      className={`${props.class} h-16  rounded-lg border-2`}
      onClick={(event) => {
        setKeyVal(props.id)
        // console.log(keyVal)
        event.stopPropagation()
      }}


      type={"replace"}>
      <div className='mr-4 text-lg'>{props.operation}</div>
      {props.action && <input onChange={handleChange} className="shadow-lg text-blue-900 text-lg w-20 h-4 mr-4 ml-auto mx-6 p-4 rounded-xl" type="text" placeholder="100"   ></input>}
    </motion.div>


  )
}



export default Blockcopy
