import React from 'react'

function Description() {

  return (
    <div className="w-2/6 p-4 space-y-3 antialiased font-sans">
      <div className="text-600 text-2xl font-bold">Take My Help!!</div>
        
      <ul className=' text-lg text-700  antialiased font-sans space-y-3'>
        <div>

        <li>Drag n Drop <b>When Flag is Clicked.</b></li>
        <li className='px-20'>Or</li>
        <li>Drag n Drop <b>When Sprite is Clicked.</b></li>
        </div>
        <li>Drag the Motion Blocks and enter the desired distance value</li>
        <li>Drag n Drop the <b>For Loop</b> and enter number of <b>Repetition</b> you Desire </li>
        <li>Drap n Drop the Motion Blocks directly inside the <b>For Loop</b></li>
        <li>Click on a Block and press <b>"Delete" key</b> to delete the block</li>
        <li>Drag the blocks to <b>Re-Arrange the Flow</b></li>
        <br></br>
        
        <li>Click <b>green Flag</b> to Start the <b>animation</b></li>
        <li>Click <b>Flag</b> to start the <b>animation</b></li>
        <li>Enter <b>IMG URL</b> to add your custom <b>Sprite</b></li>
      </ul>
    </div>
  )
}

export default Description