import React, { useState, useRef, useEffect } from "react";
import CatSprite from "./CatSprite";
import { motion, useAnimation, } from "framer-motion";
import Sprite from "./sprites";



export default function PreviewArea(props) {


  // const [location, setLocation] = useState({})
  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)
  const [R, setR] = useState(0)
  const [urlSprite, setUrl] = useState("https://www.seekpng.com/png/full/19-191322_scratch-cat-the-game-pose-as-you-know.png")
  const [waiting, setWaiting] = useState(false)
  const [forlooprunning, setForlooprunning] = useState(false)
  let flag = false
  let cancel = false

  let sprite = false

  const ref = useRef()

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
    setX(relativePos.left-70)
    setY(relativePos.top -80)
  }


  async function handleStartFlag() {
    await Promise.all([refs.current[0].handleStartFlag(),refs.current[1].handleStartFlag()])
    

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
  
  
 


  let promise = []
  const forloop = async () => {
    setForlooprunning(true)

    try {
      let Xp = X
      let Yp = Y
      let Rp = R
      let temp = { x: Xp, y: Yp, rotate: Rp }
      let temp1
      for (const item of props.flow) {
        // console.log("started", flag, sprite, item)
       
        if (item.onTap ) {
          if (item.onTap === "flag" && item !== props.flow[0])
          
          { setWaiting(true)
            await doIt("flag")
          continue
        }

          if (item.onTap === "sprite" && item !== props.flow[0])
          { setWaiting(true)
            await doIt('child-id')
          continue}
          setWaiting(false)
        }
        await new Promise(resolve => setTimeout(resolve), 500)
        // console.log(item)
        if (flag || sprite) {
          if (item.action) {
            // console.log("started")
            Yp = Yp + item.action.y
            Rp = Rp + item.action.rotate
            Xp = Xp + item.action.x
            temp = { x: Xp, y: Yp, rotate: Rp }
            // console.log(temp)
            
            temp1 = await animation.start(temp)
            promise.push(temp1)
            setX(Xp)
            setY(Yp)
            setR(Rp)
            animation.stop()
          }
          else if (item.array) {
            for (let i = 1; i <= item.repeat; i++) {
              temp1 = await insideforloop(item.array, Xp, Yp, Rp)
              // console.log(temp1)

              Xp = temp1.x
              Yp = temp1.y
              Rp = temp1.rotate
              setX(Xp)
              setY(Yp)
              setR(Rp)
            }
          }
          if (cancel) {
            throw Error("user stoped")
          }
        }
        // else {
        //   break 
        // }

      }
      flag = false
      sprite = false
      setWaiting(false)
      setForlooprunning(false)
      // console.log("finished for", waiting, forlooprunning)

    }
    catch (error) {
      console.log(error)
    }
  }

  const insideforloop = async (insidefor, Xp, Yp, Rp) => {
    let temp
    for (const item of insidefor) {
      // await new Promise(resolve => setTimeout(resolve, 500))
      if (item.action) {
        // console.log("started for")
        Yp = Yp + item.action.y
        Rp = Rp + item.action.rotate
        Xp = Xp + item.action.x
        temp = { x: Xp, y: Yp, rotate: Rp }
        // console.log(temp)
        await animation.start(temp)
      }
    }
    setX(Xp)
    setY(Yp)
    setR(Rp)

    return (temp)
  }




  const animation = useAnimation();




  const refs = useRef([])

  function handleChange(event) {
    const value = event.target.value
    // console.log(value)
    setUrl(value)

  }

  function handleStop(){
    animation.stop()
    flag = false
    sprite = false
    setWaiting(false)
    setForlooprunning(false)
    // console.log("Stoped by user", waiting, forlooprunning)

  }

  const container = useRef(null)
  return (

    <div
      id='parent-id' ref = {container}
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
        <a href="https://github.com/shashankusinggithub">
          <img className="h-10 mr-2"
            src="https://pngimg.com/uploads/github/github_PNG83.png"
          />
        </a>
        

      </div>
      <br></br>

      {/* <motion.img

        layout
        id='child-id'
        ref={ref}
        // initial={false}
        className="w-20 m-14 relative "
        //  onClick={() => setIsActive(!isActive)}
        dragMomentum={false}
        drag
        
        onDragEnd={updatePosition}
        animate={animation}
        
        transition={{ duration: 0.5, delay: 0.1 }}
        onChangeCapture={updatePosition}
        onTap={handleStartSprite}

        src={urlSprite}></motion.img> */}

{
        props.flow.map((item, index) => {

          return (
            <Sprite
              key={index}
              ref={(element) => { refs.current[index] = element }}
              url ={item.url}
              myname={item.name}
              flow={props.flow[index].sequence}
            />
          )
        })
      }




    </div>
    // </div >
  );
}
