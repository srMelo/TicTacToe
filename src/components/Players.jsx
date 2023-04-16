import React, { useState } from "react";


function Players(props) {
const {success, handleName } = props
const[bola, setBola] = useState()
const[xis, setXis] = useState()

const data = {
    nameX: 'exe',
    nameO: 'sddd'
}

function start (){
    handleName(data.nameX, data.nameO)
    return success()
}

    return (
        <div className="containerWhatName">
            <div className="whatName">
                <div className="nameX">
                    <div>x</div>
                    <div>
                        <input onChange={e => setXis(e.target.value)} placeholder="Xis" type="text" />
                    </div>
                </div>
                <div className="nameO">
                    <div>o</div>
                    <div>
                        <input onChange={e => setBola(e.target.value)} placeholder="Bola" type="text" />
                    </div>
                </div>
            <div onClick={()=> start()} className="confirm">Jogar</div>
            </div>
        </div>
    )
}

export default Players