import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";


const Sprite = forwardRef((props, ref) => {
  // const [location, setLocation] = useState({})
  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)
  const [R, setR] = useState(0)
  // const [urlSprite, setUrl] = useState("https://www.seekpng.com/png/full/19-191322_scratch-cat-the-game-pose-as-you-know.png")
  const [waiting, setWaiting] = useState(false)
  const [forlooprunning, setForlooprunning] = useState(false)
  let flag = true
  let cancel = false

  let sprite = false

  const refnope = useRef()
  const isInView = useInView({ root: props.container })

  useImperativeHandle(ref, () => ({
    handleStartFlag
  }))



  function updatePosition() {
    let relativePos = { top: 0, bottom: 0, left: 0, right: 0 }
    const parentPos = document.getElementById('parent-id').getBoundingClientRect()
    const childPos = refnope.current.getBoundingClientRect()


    relativePos.top = childPos.top - parentPos.top
    relativePos.right = childPos.right - parentPos.right
    relativePos.bottom = childPos.bottom - parentPos.bottom
    relativePos.left = childPos.left - parentPos.left
    console.log(relativePos);
    // console.log(ref.current.getBoundingClientRect())
    setX(relativePos.left - 65)
    setY(relativePos.top - 90)
    console.log(X, Y)
  }


  function handleStartFlag() {
    {
      console.log(props.flow[0], "best", forlooprunning, waiting)
      if (props.flow[0].onTap == "flag") {
        flag = true

        if (!waiting && !forlooprunning) {
          forloop()
        }
      }
    }
  }

  function handleStartSprite() {
    {
      if (props.flow[0].onTap == "sprite") { sprite = true }
      if (!waiting && !forlooprunning) {
        forloop()
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

        if (item.onTap) {
          if (item.onTap === "flag" && item !== props.flow[0]) {
            setWaiting(true)
            await doIt("flag")
            continue
          }

          if (item.onTap === "sprite" && item !== props.flow[0]) {
            setWaiting(true)
            await doIt('child-id')
            continue
          }
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
            console.log(temp)

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





  function handleStop() {
    animation.stop()
    flag = false
    sprite = false
    setWaiting(false)
    setForlooprunning(false)
    // console.log("Stoped by user", waiting, forlooprunning)

  }

  return (



    <motion.img
      // layout
      initial={{x:0, y:0}}
      ref={refnope}
      id={props.myname}
      className={`w-20 m-14  absolute`}
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
      src={props.url}>
    </motion.img>



  );
})

export default Sprite