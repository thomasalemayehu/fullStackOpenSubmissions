import React from 'react'
import Content from './Content';
import Header from './Header';
import Total from './Total';

function Course({course}) {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts}/>

      <Total sum={course.parts.reduce((sum,course)=>{return (sum = sum + course.exercises);},0)}/>
    </>
  );
}

export default Course