import React from "react"


const Filter = (props) => {
  
    return(
      <div>
          Search:<input onChange={props.handleFilterChange}
            value={props.value}/>
      </div>
      
    )
  }
export default Filter