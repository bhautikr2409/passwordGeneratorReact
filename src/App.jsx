import { useState , useCallback ,useEffect, useRef} from "react"


function App() {

  const [length,setLength] = useState(8)
  const [numberAllow , setNumberAllow] = useState(false)
  const [chaAllow , setCharAllow] = useState(false)
  const [password , setPassword] = useState("")

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{

    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllow) str += '0123456789'
    if (chaAllow) str += '!@#$%^&*(){}~'

    
    for(let i = 0 ; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1) 
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllow,chaAllow,setPassword ])


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllow,chaAllow,passwordGenerator ])

  return (
    <>
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-slate-500"> 
        <h1 className="text-center text-white font-semibold text-xl my-3">password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}

            />

            <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
          </div>

          <div className="flex text-sm gap-x-8">
              <div className="flex items-center gap-x-1">
                <input 
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e)=>{setLength(e.target.value)}}
                className="cursor-pointer"
                />

                <label className="text-xl font-medium">Length : {length}</label>
              </div>

              <div className="flex items-center gap-x-1">
                <input 
                type="checkbox"
                defaultChecked={numberAllow}
                id="numberInput"
                onChange={()=>{
                  setNumberAllow((prev)=> !prev)
                }}
                />

                <label htmlFor="numberInput" className="text-xl font-medium">Numbers</label>
              </div>

              <div className="flex items-center gap-x-1">
                <input 
                type="checkbox"
                defaultChecked={numberAllow}
                id="speChar"
                onChange={()=>{
                  setCharAllow((prev)=> !prev)
                }}
                />

                <label htmlFor="speChar" className="text-xl font-medium">Special Character</label>
              </div>
          </div>
      </div>  
    </>
  )
}

export default App
