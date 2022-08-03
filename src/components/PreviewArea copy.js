import React, { useState, useRef, useEffect } from "react";
import CatSprite from "./CatSprite";
import { motion, useAnimation, } from "framer-motion";
import Sprite from "./sprites";



export default function PreviewArea(props) {


  // const [location, setLocation] = useState({})
  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)
  const [R, setR] = useState(0)

  const animation = useAnimation();
  const [urlSprite, setUrl] = useState("https://www.seekpng.com/png/full/19-191322_scratch-cat-the-game-pose-as-you-know.png")
  const [waiting, setWaiting] = useState(false)
  const [forlooprunning, setForlooprunning] = useState(false)
  let flag = false
  let cancel = false
  let sprite = false


  function updatePosition() {
    let relativePos = { top: 0, bottom: 0, left: 0, right: 0 }
    const parentPos = document.getElementById('parent-id').getBoundingClientRect()
    const childPos = document.getElementById('child-id').getBoundingClientRect()
    relativePos.top = childPos.top - parentPos.top
    relativePos.right = childPos.right - parentPos.right
    relativePos.bottom = childPos.bottom - parentPos.bottom
    relativePos.left = childPos.left - parentPos.left
    console.log(relativePos);
    // console.log(ref.current.getBoundingClientRect())
    setX(relativePos.left - 70)
    setY(relativePos.top - 80)
  }


  async function handleStartFlag() {
    {
      if (props.flow[0].onTap == "flag") {
        flag = true

        if (!waiting && !forlooprunning) {
          // console.log(props.flow[0], "best", forlooprunning, waiting)
          await Promise.all([refs.current[0].handleStartFlag(), refs.current[1].handleStartFlag()
          ])

        }
      }
    }
  }




  let waitForPressResolve;

  function waitForPress() {
    return new Promise(resolve => waitForPressResolve = resolve);
  }


  function btnResolver() {
    if (waitForPressResolve) waitForPressResolve();
  }

  async function doIt(name) {
    setWaiting(true)
    const btn = document.getElementById(name);
    btn.addEventListener('click', btnResolver);
    {
      // console.log(1);
      await waitForPress();
    }
    btn.removeEventListener('click', btnResolver);
    // console.log('Finished');
  }









  const refs = useRef([])


  function handleChange(event) {
    const value = event.target.value
    // console.log(value)
    setUrl(value)

  }

  function handleStop() {
    animation.stop()
    flag = false
    sprite = false
    setWaiting(false)
    setForlooprunning(false)
    // console.log("Stoped by user", waiting, forlooprunning)

  }


  return (

    <div
      id='parent-id'
      className="flex-none whitespace-nowrap w-full  overflow-x-hidden  p-2 "
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
        <input onChange={handleChange} type="text" placeholder="Submit your IMG url" className='text-blue-900 border-4 border-indigo-500/100 text-lg space-x-20 w-90 h-10 p-2 rounded-lg'></input>
      </div>

      <div className="flex-row flex absolute opacity-50 ">
        <a href="https://www.linkedin.com/in/shashank1997/">
          <img className="h-10  mr-2"
            src="https://seeklogo.com/images/L/linkedin-black-icon-logo-ECC426C572-seeklogo.com.png" />

        </a>
        <a href="https://github.com/shashankusinggithub">
          <img className="h-10 mr-2"
            src="https://pngimg.com/uploads/github/github_PNG83.png"
          />
        </a>


      </div>
      <br></br>

      {
        props.flow.map((items, index) => {

          return (
            <Sprite
              key={index}
              ref={(element) => { refs.current[index] = element }}
              url ={props.url}
              myname={props.cat}
              flow={props.flow[index]}
            />
          )
        })
      }

      {/* <Sprite
        key={0}
        ref={(element) => { refs.current[0] = element }}
        // ref = {childref}
        // handleChange={handleChange}
        myname={"cat"}
        flow={props.flow}
      />

      <Sprite
        key={1}
        ref={(element) => { refs.current[1] = element }}
        // handleChange={handleChange}
        myname={"cat2"}
        flow={props.flow}
      />
 */}


    </div>
    // </div >
  );
}
