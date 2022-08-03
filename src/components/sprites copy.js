import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, useAnimation, } from "framer-motion";

const Sprite = forwardRef((props, ref) => {

  // // const [location, setLocation] = useState({})
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
    const childPos = document.getElementById(props.myname).getBoundingClientRect()
    relativePos.top = childPos.top - parentPos.top
    relativePos.right = childPos.right - parentPos.right
    relativePos.bottom = childPos.bottom - parentPos.bottom
    relativePos.left = childPos.left - parentPos.left
    console.log(relativePos, parentPos, childPos);

    console.log(refnop.current.getBoundingClientRect())
    setX(relativePos.left )
    setY(relativePos.top )
    console.log(X,Y)
  }

  function handleStartFlag() {
    console.log("clicked sprite 2", props.flow, waiting, forlooprunning)

    {
    if (props.flow[0].onTap == "flag")
    { flag = true
   //  console.log(props.flow[0], "best", forlooprunning, waiting)
     
     if(!waiting && !forlooprunning){
       forloop()
     }}
   }
 }


//  useImperativeHandle(
//    ref,
//    () => {
//      forloop()
//    },
//    [],
//  )

 useImperativeHandle(ref, ()=>({
  
  handleStartFlag}))

  

  function handleStartSprite() {
    console.log("clicked sprite 2", props.flow, waiting, forlooprunning)
    {
      if (props.flow[0].onTap === "sprite") { sprite = true }
      console.log(waiting)
      if (!waiting && !forlooprunning) {
        forloop()
      }
    }
  }


  // to hold the loop untill button is pressed
  let waitForPressResolve;

  function waitForPress() {
    console.log("waitfor pressed");
    return new Promise(resolve => waitForPressResolve = resolve);
  }

  function btnResolver() {
    console.log("button solver");
    if (waitForPressResolve) waitForPressResolve();
  }

  async function doIt(name) {

    const btn = document.getElementById(name);
    btn.addEventListener('click', btnResolver);

    console.log("before wait");
    await waitForPress();
    console.log("after wait")
    btn.removeEventListener('click', btnResolver);
    // console.log('Finished');
  }



  let promise = []
  const forloop = async () => {
    console.log('trying', props.flow, props.myname)
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

  const refnop = useRef()
  return (

    

      <motion.img
        layout
        ref = {refnop}
        id={props.myname}
        className="w-20 m-14 relative "
        dragMomentum={false}
        drag
        onDragEnd={updatePosition}
        animate={animation}
        // transition={{ type: 'spring', stiffness:0}}
        transition={{
          delay: 0.5,

        }}
        onChangeCapture={updatePosition}
        // onTap={handleStartSprite}
        src={urlSprite}>
      </motion.img>

    

  );
})

export default Sprite