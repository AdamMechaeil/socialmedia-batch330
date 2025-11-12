import React, { useState } from 'react'
import { Signin } from './Signin'
import { Signup } from './Signup'

const Main = () => {
  const [mode,setMode] = useState("signin")
  return (
    <div className='bg-black'>
      <div className="mx-auto max-w-screen-lg px-4">
      {
        mode=="signin"?<Signin setMode={setMode}/>:<Signup setMode={setMode}/>
      }
    </div>
    </div>
  )
}

export default Main