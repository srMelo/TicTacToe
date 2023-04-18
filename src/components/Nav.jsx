import React from "react";


function Nav (props){
    const {playerX, playerO, tied, reset} = props

    return(
        <div style={{display:'flex', justifyContent:'space-between'}} className="nav">
            <div className="score">
                <div style={{display:'flex', justifyContent:'center'}} className="titleScore">
                    <p style={{fontSize:'30px'}}>Score</p>
                </div>
                <div className="pointers">
                    <div style={{display:'flex'}} className="scoreX">x : <p className="pointer" style={{color:'red', margin:'1px'}}>{playerX}</p> </div>
                    <div style={{display:'flex'}} className="scoreX">o : <p className="pointer" style={{color:'red', margin:'1px'}}>{playerO}</p> </div>
                </div>
            </div>
            {tied?
            <div onClick={()=> reset()} style={{justifyContent:'flex-start', width:'35vh', display:'flex', alignItems:'center',padding:'10px'}}>
                <h1 className="tied" >Velha!</h1>
            </div>
            :''
            }
            <div className="nameGame">
                <h2>Tic Tac Toe</h2>
            </div>
        </div>
    )
}


export default Nav