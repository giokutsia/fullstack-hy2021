import React from 'react'


const Head = ({name}) => {

  return <h1>{name}</h1>
}

const Parts = ({part}) =>{
    const {name, exercises} = part

    return (
      <p>{name} {exercises}</p>
      )

}
const Content = ({parts}) => {

  return (
    parts.map(part => <Parts key={part.id} part={part} />)
  )  
}

const SumExer =({exercises}) => {
  const sum = exercises.reduce((x,y) => x + y, 0)
  return (
    <h3>Sum of exercises {sum}</h3>)
   
}


const Course = ({ course }) => {
  const { name, parts } = course;
  //console.log(course)
  //console.log(name)
  //console.log(parts)
  
  const exer = parts.map(ex => ex.exercises)
  //console.log(exer)
  return (
    <div>
      <Head name={name} />
      <Content parts={parts}  />
      <SumExer exercises={exer} />
    </div>
  );
};

export default Course