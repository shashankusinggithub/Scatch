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
        const index = prv.findIndex(object => {
          return object.key === props.id;
        });

        // console.log(prv[index])


        {
          if (prv[index].id == "move fw") {
            prv[index].action.x = value
          }
          else if (prv[index].id == "move bw") {
            prv[index].action.x = -1 * value
          }
          else if (prv[index].id == "move up") {
            prv[index].action.y = -1 * value
          }
          else if (prv[index].id == "move dwn") {
            prv[index].action.y = value
          }
          else if (prv[index].id == "rotateAntiClock") {
            prv[index].action.rotate = -1 * value
          }
          else if (prv[index].id == "rotateClockWise") {
            prv[index].action.rotate = value
          }

          // console.log(prv[index].action)
          return ([...prv])
        }
      })
    }

    else {
      props.setInnerBlock((prv) => {
        const index = prv.findIndex(object => {
          return object.key === props.id;
        });

        // console.log(prv[index])


        {
          if (prv[index].id == "move fw") {
            prv[index].action.x = value
          }
          else if (prv[index].id == "move bw") {
            prv[index].action.x = -1 * value
          }
          else if (prv[index].id == "move up") {
            prv[index].action.y = -1 * value
          }
          else if (prv[index].id == "move dwn") {
            prv[index].action.y = value
          }
          else if (prv[index].id == "rotateAntiClock") {
            prv[index].action.rotate = -1 * value
          }
          else if (prv[index].id == "rotateClockWise") {
            prv[index].action.rotate = value
          }

          // console.log(prv[index].action)
          return ([...prv])
        }
      })
    }
  }

// console.log(props.action, "action")

  return (

    <motion.div id="block"

      //  onFocus={()=> console.log("captured", props.id)}
      className={`${props.class} h-16   rounded-lg border-2`}
      onClick={(event) => {
        setKeyVal(props.id)
        console.log(keyVal)
        event.stopPropagation()
      }}


      type={"replace"}>
        <div className='mr-4 text-lg'>{props.operation}</div>
      {props.action && <input onChange={handleChange} className="shadow-lg text-blue-900 text-lg w-20 h-4 mr-4 ml-auto mx-6 p-4 rounded-xl" type="text" defaultValue={100}  ></input>}
    </motion.div>


  )
}



export default Blockcopy
