import { useCallback, useEffect, useRef, useState } from "react"




function App() {
  const [length, setLength] = useState(5);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isCharacters, setIsCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(
    () => {
      let pass = "";
      let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if (isNumbers) {
        str += "0123456789"
      }

      if (isCharacters) {
        str += "!@#$%^&*-_+=[]{}~`"
      }

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length +1)
        pass += str.charAt(char)
        
      }

      setPassword(pass)
      
    }, [length, isNumbers, isCharacters, setPassword]
  );

    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
    }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, isNumbers, isCharacters, passwordGenerator]);

 /*  console.log("Numbers: "+isNumbers);
  console.log("Characters: "+isCharacters); */

  return (
    <>
     <div className=" bg-black w-full h-screen items-center justify-center">
      <h1 className='py-4 text-gray-300 ml-auto text-3xl text-center'>Password Generator</h1>  
      <div className="m-auto mt-6 bg-slate-400 max-w-2xl rounded-lg ring-2 ring-blue-700 shadow-xl px-3 py-8 ">
        <div className=" flex items-center justify-center text-2xl p-4">
          <input 
            type="textbox"
            placeholder="Password"
            value={password}
            className="py-2 w-full rounded-l-xl outline-none"
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className="px-4 py-2 bg-blue-600 rounded-r-xl hover:bg-blue-800"
          >
              Copy
          </button>
        </div>
        <div className=" flex items-center justify-center text-2xl p-4 gap-5">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              name="length"
              className=" cursor-pointer"
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Range: {length}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={isNumbers}
              name="NumberInput"
              onClick={() => {setIsNumbers(!isNumbers)}}
            />
          <label htmlFor="NumberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={isCharacters}
              name="CharacterInput"
              onClick={() => {setIsCharacters(!isCharacters)}}
            />
            <label htmlFor="CharacterInput">Characters</label>
          </div>
          
        </div>
        
      </div>
     </div> 
    </>
  )
}

export default App
