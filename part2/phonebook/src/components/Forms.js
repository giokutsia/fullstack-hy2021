import React from "react";

const Forms = (props) =>{

    return(
        <form onSubmit={props.onSubmit}>
        <div>
        <label>Name:</label> <input  onChange={ props.changeName} value={props.nameVal} />
        </div>
        <div>
        <label>Number:</label> <input onChange={props.changeNumb} value={props.numberVal}/>
        
        </div>


        
          <button className="divButt" type="submit">add</button>
        
      </form>
    )
}

export default Forms
