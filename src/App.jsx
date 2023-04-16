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

  const [status, setStatus] = useState(false)
  const [check, setCheck] = useState(true)

  const [nameX, setNameX] = useState('xis')
  const [nameO, setNameO] = useState('bola')

  function start() {
    const newArray = Array(9).fill('')
    setArea(newArray)
    winnerO ? setSocoreO(scoreO + 1) :''
    winnerX ? setSocoreX(scoreX + 1) :'' 
    setWinnerO(false)
    setWinnerX(false)
    setStatus(!status)
  }

  const namePlayer = (nameXis, nameBola)=>{
    setNameX(nameXis)
    setNameO(nameBola)

    return console.log(nameXis, nameBola)
  }

  const infoUsers = () => {
    setCheck(!check)
    return setStatus(false)
  }

  useEffect(() => {
    start()
  }, [check])

  useEffect(() => {
    winnerO ? setStatus(!status)
      :
      winnerX ? setStatus(!status)
        : ''
  }, [value])

  const howX = () => {
    // ----> value  'o'
    if (area && area[0] == 'o' && area[1] == 'o' && area[2] == 'o') {
      return setWinnerO(!winnerO)
    }
    if (area && area[3] == 'o' && area[4] == 'o' && area[5] == 'o') {
      return setWinnerO(!winnerO)
    }
    if (area && area[6] == 'o' && area[7] == 'o' && area[8] == 'o') {
      return setWinnerO(!winnerO)
    }
    // ----> value 'x'
    if (area && area[0] == 'x' && area[1] == 'x' && area[2] == 'x') {
      return setWinnerX(!winnerX)
    }
    if (area && area[3] == 'x' && area[4] == 'x' && area[5] == 'x') {
      return setWinnerX(!winnerX)
    }
    if (area && area[6] == 'x' && area[7] == 'x' && area[8] == 'x') {
      return setWinnerX(!winnerX)
    }
    howY()
  }

  const howY = () => {
    // ^ value 'x'
    if (area && area[0] == 'x' && area[3] == 'x' && area[6] == 'x') {
      return setWinnerX(!winnerX)
    }
    if (area && area[1] == 'x' && area[4] == 'x' && area[7] == 'x') {
      return setWinnerX(!winnerX)
    }
    if (area && area[2] == 'x' && area[5] == 'x' && area[8] == 'x') {
      return setWinnerX(!winnerX)
    }
    // ^ value 'o'
    if (area && area[0] == 'o' && area[3] == 'o' && area[6] == 'o') {
      return setWinnerO(!winnerO)
    }
    if (area && area[1] == 'o' && area[4] == 'o' && area[7] == 'o') {
      return setWinnerO(!winnerO)
    }
    if (area && area[2] == 'o' && area[5] == 'o' && area[8] == 'o') {
      return setWinnerO(!winnerO)
    }
    howZ()
  }

  const howZ = () => {
    if (area && area[0] == 'x' && area[4] == 'x' && area[8] == 'x') {
      return setWinnerX(!winnerX)
    }
    if (area && area[2] == 'x' && area[4] == 'x' && area[6] == 'x') {
      return setWinnerX(!winnerX)
    }
    if (area && area[0] == 'o' && area[4] == 'o' && area[8] == 'o') {
      return setWinnerO(!winnerO)
    }
    if (area && area[2] == 'o' && area[4] == 'o' && area[6] == 'o') {
      return setWinnerO(!winnerO)
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
      howX()
    }
  }




  return (
    <>

      <div id="container">
        <Nav playerX={scoreX} playerO={scoreO} />
        <div className='container'>
          {
            check?
              <Players handleName={()=> namePlayer()} success={infoUsers}/>
              :
              <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className='game'>

            {
              status ?
                <>
                  <div style={{display:'flex',flexDirection:'column', alignItems:'center', fontSize:'25px'}} onClick={() => { setValue(true) }}>{nameX && nameX}<div className={value ? 'selected' : 'values'}>x</div></div>
                  <div className="App">
                    {area &&
                      area.map((e, index) => {
                        return <div key={index} onClick={() => insert(index, value)} id={`area${index}`} className='area'>{e}</div>
                      })}
                  </div>
                  <div style={{display:'flex',flexDirection:'column', alignItems:'center', fontSize:'25px'}} onClick={() => { setValue(false) }}>{nameO}<div className={value ? 'values' : 'selected'}>o</div></div>
                </>
                :
                <>
                  <div className='WinnerScreen'>
                    <div style={{display: 'flex', alignItems:'center', justifyContent:'center', padding:'20px', margin: '20px'}} className="screenInfo">
                      <h1>Parabéns! O vencedor é :  {winnerO ? 'o' : 'x'}</h1>
                    </div>
                    <div className='reset'>
                      <div><h2 onClick={() => start()}>Jogar Novamente</h2></div>
                    </div>
                  </div>
                </>
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
