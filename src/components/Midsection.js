import React, { useState } from 'react'
import MidArea from './MidArea'


export const Midsection = (props) => {
    const [showurl, setShowurl] = useState('')
    const [activeSprite, setactiveSprite] = useState(0)

    const HandleChange = () => {
        const urlProvided = document.getElementsByName('url')[0].value
        setShowurl(urlProvided)
    }

    const HandleSubmit = () => {
        const nameprovided = document.getElementsByName('name')[0].value
        const urlProvided = document.getElementsByName('url')[0].value
        if (nameprovided && urlProvided) {
            const temp = { name: nameprovided, url: urlProvided, sequence: [] }

            props.setFlow((prv) => {
                const temp1 = [...prv, temp]
                console.log(temp1, prv)
                return (temp1)
            })

        } else {
            alert("fill both the blanks")
        }
    }

    return (
        <div className='flex flex-row '>
            <div className='w-3/5'>
                {
                    props.flow.map((item, index) => {

                        return (
                            <MidArea key={index} flow={props.flow} setFlow={props.setFlow} activeSprite={activeSprite} name={item.name} spriteIndex={index} url={item.url} />
                        )
                    })
                }
            </div>

            <div className='w-2/5 space-y-2 p-4 ' >
                <img className="rounded-sm" src={showurl} />
                <input className='rounded-md w-full h-10 border-2 border-black' type="text" name="url" placeholder='Enter img url' onChange={HandleChange} />
                <input className='rounded-md w-full h-10 p-2 border-2 border-black' name="name" placeholder='Enter Name' />
                <button className="bg-slate-300 rounded-sm border-2 border-black" onClick={() => HandleSubmit()}>
                    Submit
                </button>
                <h1 className='text-600 text-2xl font-bold '>SPRITES</h1>
                <div className="grid grid-cols-2 justify-center ">
                    {
                        props.flow.map((item, index) => {
                            return (
                                <div className='space-y-2 p-4'>
                                    <img className={`w-20 ${activeSprite === index && 'border-4 border-black'} `} src={item.url} onClick={() => { setactiveSprite(index); console.log(index) }} key={index} />
                                    <h2 className=''>{item.name}</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
