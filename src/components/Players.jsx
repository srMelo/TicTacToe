import React, { useEffect, useState } from "react";


function Players(props) {
const {success, handleName} = props
const[bola, setBola] = useState('Bola')
const[xis, setXis] = useState('Xis')

    function start (){
        handleName(xis, bola)
        success()
    }

    return (
        <div className="containerWhatName">
            <div className="whatName">
                <div className="nameX">
                    <div>x</div>
                    <div>
                        <input onChange={e => setXis(e.target.value)} placeholder="Xis" type="text" value={xis}/>
                    </div>
                </div>
                <div className="nameO">
                    <div>o</div>
                    <div>
                        <input onChange={e => setBola(e.target.value)} placeholder="Bola" type="text" value={bola} />
                    </div>
                </div>
            <div onClick={()=> start()} className="confirm">Jogar</div>
            </div>
        </div>
    )
}

export default Players