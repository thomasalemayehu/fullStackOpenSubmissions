import React from 'react'
import Part from './Part';

function Content({ parts }) {
  return(
    <>
    {parts.map((course) => <Part key={course.id} id={course.id} name={course.name} exercises={course.exercises}></Part>)}
    </>
  );
}

export default Content