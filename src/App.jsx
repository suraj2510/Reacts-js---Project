import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {
const[PassWord, setpassword]=useState("")
const[length,setlength]=useState(8)
const[number,setnumber]=useState(false)
const[char,setchar]=useState(false)

//use ref hooks
const passref=useRef(null)

    const PassGen=useCallback(()=>{
      let pass=""
      let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz"

      if(number){
        string+="0123456789"
      }
      if(char){
        string+="@#$%^&*{}~`"
      }
      for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*string.length+1)
      pass +=string.charAt(char)   
      }
      setpassword(pass)
    },[length,char,number,setpassword])

   const copyPasswordToClipBoard=useCallback(()=>{
    window.navigator.clipboard.writeText(PassWord)  
   },[PassWord])

    useEffect(()=>{
      PassGen()
    },[number,char,length,PassGen])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center font-bold mt-2'>PassWord Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 ' >
        <input
         type="text"
         value={PassWord}
         className='outline-none w-full py-1 px-3 '
         placeholder='Password'
         readOnly
         ref={passref}
        />
        <button 
       onClick={copyPasswordToClipBoard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={char}
          id='characterinput'
         onChange={()=>{setchar((prev)=>!prev);
        }}
          
          />
          <label htmlFor="characterinput">Characters</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={char}
          id='characterinput'
         onChange={()=>{setchar((prev)=>!prev);
        }}
          
          />
          <label htmlFor="characterinput">Numbers</label>

        </div>

      </div>
    
     </div>
    </> 
  )
}

export default App