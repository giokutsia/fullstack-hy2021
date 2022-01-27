import React from "react";

const Forms = (props) =>{

    return(
        <form onSubmit={props.onSubmit}>
        <div>
          name: <input onChange={ props.changeName} value={props.nameVal}/>
        </div>
        <div>
          number:<input onChange={props.changeNumb} value={props.numberVal}/>
        
        </div>
        <div>
          <button  type="submit">add</button>
        </div>
      </form>
    )
}

export default Forms
