import React from 'react'
import { useDrag } from "react-dnd";


function Block(props) {
    const [{isDragging}, drag] = useDrag(()=>({
        type: `${props.type}`,
        item: {props: props},
        collect: (monitor) =>({
          isDragging: !!monitor.isDragging(),
        })
      }))
    let dragable
    
    if (props.type){
      dragable = drag }else{
       dragable = {}
      }
  return (
    <div ref={dragable} className={`${props.class} h-16 shadow-lg rounded-lg border-2 -space-y-2 items-center `}>{props.operation}</div>
  )
}



export default Block
