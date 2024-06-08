import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(5)
  const [numAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow){
      str += "0123456789"}
      if (charAllow){
        str += "`~!@#$%^&*(){}/<>-_+="}
        for (let i = 1; i <= length; i++) {
          const char = Math.floor(Math.random() * str.length +1);
          pass += str.charAt(char);
        }
        setPassword(pass)

  },[length,numAllow,charAllow,setPassword])

  useEffect(()=>{
    passwordGenerator(); 
  },[length,numAllow,charAllow,passwordGenerator])

  const copyText = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,10);
  },[password])
  return (
    <>
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>
      <h1 className='text-white text-center my-2 p-4 text-lg'> Text Generator </h1>
      <div className='flex shadow rounded-lg overflow-hiddenmb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3 rounded-md' placeholder='Text Generator' ref={passwordRef} readOnly/>
        <button onClick={copyText}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-md'>Copy</button>
      </div>
      <div className='flex text-md gap-x-6 my-2 p-2'>
        <div className='flex items-center gap-x-1'>
           <input type="range" min={5} max={50} value={length} className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}/>
           <label>length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numAllow} id="numberInput" onChange={()=>{setNumberAllow((prev)=>!prev)}}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllow} id="charInput" onChange={()=>{setCharAllow((prev)=>!prev)}}/>
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
