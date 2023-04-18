import { useState, useEffect, React } from 'react'
import './App.css'
import Nav from './components/Nav'
import Players from './components/Players'
import Footer from './components/Footer'

function App() {
  const [scoreX, setSocoreX] = useState(0)
  const [scoreO, setSocoreO] = useState(0)

  const [area, setArea] = useState()
  const [value, setValue] = useState(false)

  const [winnerX, setWinnerX] = useState(false)
  const [winnerO, setWinnerO] = useState(false)
  const [old, setOld] = useState(false)

  const [status, setStatus] = useState()
  const [reStart, setReStart] = useState(false)
  const [check, setCheck] = useState(true)

  const [nameX, setNameX] = useState('')
  const [nameO, setNameO] = useState('')


  const namePlayer = (x, o)=>{
    setNameX(x)
    setNameO(o)
  }
  const chooseTime = (val)=>{
    const result = area.filter((e)=>{
     return e == ''
    })
    result.length == 9 ? setValue(val):''
  }

  function start() {
    setReStart(false)
    const newArray = Array(9).fill('')
    setArea(newArray)
    winnerO ? setSocoreO(scoreO + 1) :''
    winnerX ? setSocoreX(scoreX + 1) :'' 
    setWinnerO(false)
    setWinnerX(false)
    if(old){
      setStatus(true)
      return setOld(false)
    }else{
    setStatus(true)}
  }

  const infoUsers = () => {
    setCheck(!check)
    return setStatus(false)
  }

  useEffect(() => {
    start()
  }, [check])

  useEffect(() => {
    if(winnerO){
      setStatus(!status)
      return setReStart(true)}  
    if(winnerX){
      setStatus(!status)
      return setReStart(true)}
    else{tied()}
  }, [value])

  const checkWinner = () => {
    const conbinationsForWinner = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]
    conbinationsForWinner.forEach((e)=>{
      const xWinner = e.filter((val)=>{
        return area[val] == 'x'
       })
      const oWinner = e.filter((val)=>{
        return area[val] == 'o'
       })
       xWinner.length == 3?setWinnerX(!winnerX):''
       oWinner.length == 3?setWinnerO(!winnerO):''
    })
  }

    const tied = ()=>{
      const result = area && area.filter((e)=>{
        return e == ''
      })
      if(result && result.length == 0){
        return setOld(true)
      }
    }

  function valueContent(element) {
    return area[element] == 'x' ? true
      : area[element] == 'o' ? true : false
  }


  const insert = (index, trueOrFalse) => {
    if (valueContent(index)) {
      return setValue(trueOrFalse)
    } else {
      area.splice(index, 1, value ? 'x' : 'o')
      setValue(!value)
      checkWinner()
    }}

  return (
    <>

      <div id="container">
        <Nav playerX={scoreX} playerO={scoreO} tied={old} reset={start} />
        <div className='container'>
          {
            check?
              <Players handleName={namePlayer} success={infoUsers}/>
              :
              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className='game'>

            {
              status ?
                <>
                  <div className='nameXis' style={{display:'flex',flexDirection:'column', alignItems:'center', fontSize:'25px'}}>{value?nameX:''}
                    <div onClick={()=>chooseTime(true)} className={value ? 'selected' : 'values'}>x</div>
                      </div>
                  <div className="App">
                    {area &&
                      area.map((e, index) => {
                        return <div key={index} onClick={() => insert(index, value)} id={`area${index}`} className='area'>{e}</div>
                      })}
                  </div>
                  <div className='nameBola' style={{display:'flex',flexDirection:'column', alignItems:'center', fontSize:'25px'}}>{value?'':nameO}
                  <div onClick={()=>chooseTime(false)} className={value ? 'values' : 'selected'}>o</div></div>
                </>
                :''
                }
                {
                  reStart?
                <>
                  <div className='WinnerScreen'>
                    <div style={{display: 'flex', alignItems:'center', justifyContent:'center', padding:'20px', margin: '20px'}} className="screenInfo">
                      <h1>Parabéns! O vencedor é :  {winnerO ? nameO : nameX}</h1>
                    </div>
                    <div className='reset'>
                      <div><h2 onClick={start}>Jogar Novamente</h2></div>
                    </div>
                  </div>
                </>
                :
                ''
                }
          </div>
          }
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
