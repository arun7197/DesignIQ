import React from 'react'
import { Textarea } from "@/components/ui/textarea"

export default function TextArea({TextInput}) {
  return (
    <div>
        <label className='text-gray-400'>Enter Additional Requirements (Optional)</label>
        <Textarea onChange={(event)=> TextInput(event.target.value)}/>
    </div>
  )
}
