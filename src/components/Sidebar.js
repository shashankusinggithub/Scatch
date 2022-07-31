import React from "react";

import { motion } from "framer-motion"

import Block from "./Block";


export default function Sidebar() {


  const eventsList = [
    {
      func: "clickFlag",
      class: "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "When 🏁 Flag is Clicked",
      onTap: "flag"
      
      
    },
    {
      func: "clickSprite",
      class: "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "When this 🫵 sprite clicked",
      onTap: "sprite"
      
    }]

  const motionList = [{
    func: "move fw",
    class: "flex flex-row flex-wrap bg-blue-800 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    operation: "Move Forward Steps  👉  ",
    action: {x: 400, y:0, rotate:0}
  },
  {
    func: "move bw",
    class: "flex flex-row flex-wrap bg-blue-800 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    operation: "Move Backward Steps   👈 ",
    action: {x: -400, y:0, rotate:0}
  },
  {
    func: "move up",
    class: "flex flex-row flex-wrap bg-blue-800 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    operation: "Move Upside Steps  👆",
    action: {x:0, y:-400, rotate:0}
  },
  {
    func: "move dwn",
    class: "flex flex-row flex-wrap bg-blue-800 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    operation: "Move Downside Steps  👇︎  ",
    action: {x: 0, y:400, rotate:0}
  },
  {
    func: "rotateAntiClock",
    class: "flex flex-row flex-wrap bg-blue-800 text-white px-2 py-1 my-2 text-sm cursor-pointer",
    operation: "Rotate Anti-Clockwise ↪️ ",
    action: {x: 0, y:0, rotate:-90}
  },
    {
      func: "rotateClockWise",
      class: "flex flex-row flex-wrap bg-blue-800 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "Rotate Clockwise ↩️ ",
      action: {x: 0, y:0, rotate:90}

    },
  ]
  const controlList =[
    {
      func: "for",
      class: "flex  flex-row flex-wrap bg-red-500 text-white px-7 py-3 my-2 text-sm cursor-pointer",
      operation: "For Loop reps 🔁 ",
      array : [],
      repeat : 5     

    },

  ]

  return (
    <div className="w-50 flex-none h-full  items-start overflow-y-auto flex flex-col  p-2 border-r border-gray-200 text-600 text-2xl font-bold ">
      <div className="font-bold"> {"Events"} </div>
      {eventsList.map((item)=> {
        return <Block func={item.func} item={item} class={item.class} operation={item.operation} type={"insert"}/>
      })}


      <div className="font-bold"> {"Motion"} </div>
      {motionList.map((item)=> {
        return <Block item={item} func={item.func} class={item.class} operation={item.operation} type={"insert"}/>
      })}
      <div className="font-bold"> {"Control"} </div>
      {controlList.map((item)=> {
        return <Block item={item} func={item.func} class={item.class} operation={item.operation} type={"insertinto"}/>
      })}

    </div>
    
  );
}


