import React, { useState } from 'react'
import MidArea from './MidArea'


export const Midsection = (props) => {
    const [showurl, setShowurl]= useState('')
    const [sprites, setSprites] = useState([])
    const [activeSprite, setactiveSprite] = useState(0)

    
    const HandleChange =()=>{
        const urlProvided = document.getElementsByName('url')[0].value
        setShowurl(urlProvided)  
    }
    
    const HandleSubmit = ()=>{
        const nameprovided = document.getElementsByName('name')[0].value
        const urlProvided = document.getElementsByName('url')[0].value
        if(nameprovided && urlProvided){
            const temp = {name : nameprovided, url: urlProvided , sequence : []}

            props.setFlow((prv)=>{
            const temp1 = [...prv, temp]
            console.log(temp1, prv)
             return(temp1)
            })
        
        
        }else{
            alert("fill both the blanks")
        }
        
    }

    return (
        <div className='flex flex-row '>
            <div className='w-3/5'>
                {
                    props.flow.map((item, index)=>{
                        
                        return(
                            <MidArea key={index} flow={props.flow} setFlow={props.setFlow}  activeSprite={activeSprite} name={item.name} index={index} url={item.url} />
                        )
                        
                    })
                }
                

            </div>
            

            <div className='w-2/5'>

                <input type="text" name="url" placeholder='enter img url' onChange={HandleChange}/>
                <input type="text" name="name" placeholder='enter Name'/>
                <h1 onClick={()=>HandleSubmit()}>
                    Submit
                </h1>
                <img src={showurl}/>
                <h1>hi</h1>
                {
                    props.flow.map((item, index)=>{
                        return ( 
                            <img src={item.url} onClick={()=> {setactiveSprite(index); console.log(index)}} key={index}/>
                        )
                    })
                }

                
            </div>


        </div>

    )
}
