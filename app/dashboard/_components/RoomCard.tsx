import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';


export default function RoomCard({ room }) {
    const [openDialog,setOpenDialog]=useState(false);
    const openWindow=()=>{
        setOpenDialog(true);
    }
    return (
        <div className='shadow-md rounded-md' onClick={()=>openWindow()}>
            <ReactBeforeSliderComponent
                firstImage={{ imageUrl: room.generatedImage }}
                secondImage={{ imageUrl: room.orgImage }}
            />
            <div className='flex justify-center p-4'>
                <p className="text-gray-500">{room.roomType}</p>
            </div>
        </div>
    )
}
