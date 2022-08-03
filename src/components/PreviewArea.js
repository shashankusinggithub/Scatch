import React, { useRef, u} from "react";
import {  useAnimation, } from "framer-motion";
import Sprite from "./sprites";


export default function PreviewArea(props) {
  const animation = useAnimation();
  const refs = useRef([])
  
  async function handleStop() {
    animation.stop()
    const promises = []
    props.flow.map((item, index) => {
      console.log(index)
      promises.push(refs.current[index].handleStop())
    })

    await Promise.all(promises)
    // console.log("Stoped by user", waiting, forlooprunning)
  }

  async function handleStartFlag() {
    const promises = []
    props.flow.map((item, index) => {
      console.log(index)
      promises.push(refs.current[index].handleStartFlag())
    })

    await Promise.all(promises)
  }

  const container = useRef(null)
  return (

    <div
      id='parent-id' ref={container}
      className="flex-none whitespace-nowrap h-full w-full relative overflow-x-scroll  p-2 "
    >
      <div className="  items-end float-left flex flex-row space-x-6 absolute right-2">

        <img
          id="flag"
          className="w-16 shadow-lg "
          src="https://w7.pngwing.com/pngs/186/520/png-transparent-computer-icons-flag-icon-design-various-actions-miscellaneous-angle-flag-thumbnail.png"
          onClick={handleStartFlag}
        />

        <img className="h-16 shadow-lg"
          onClick={handleStop}
          src="https://www.clipartmax.com/png/full/218-2181389_stop-it-simple-multicolor-icon-stop-traffic-sign.png" />

      </div>

      <div className="flex-row flex absolute opacity-50 ">
        <a href="https://www.linkedin.com/in/shashank1997/">
          <img className="h-10  mr-2"
            src="https://seeklogo.com/images/L/linkedin-black-icon-logo-ECC426C572-seeklogo.com.png" />

        </a>
        <a href="https://portfolioshashank.netlify.app/">
          <img className="h-10 mr-2"
            src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
          />
        </a>

      </div>
      <br></br>

      {
        props.flow.map((item, index) => {

          return (
            <Sprite
              key={index}
              ref={(element) => { refs.current[index] = element }}
              url={item.url}
              myname={item.name}
              flow={props.flow[index].sequence}
            />
          )
        })
      }
    </div>

  );
}
