import React from 'react'

const Header = ({coursename}) => {
    return (
        <h1>
        {coursename}
        </h1>
    )
  }

  const Content = ({content}) => {
    return (
      <div>
          {content.map(course =>
            <div key={course.id}>
              {course.name} {''}
              {course.exercises}
            </div>
          )}
      </div>
    )
  }

  const Total = ({all}) => {
    const total = all.reduce( (s, p) => s + p.exercises, 0)
    return (
     <h3>
       Number of exercises: {total}
     </h3>
    )
  }



  const Course = ({course}) => {
    const whole = []
      for (let i = 0; i < course.length; i++) {
        whole.push(
          <div key={course[i].id}>
          <Header coursename = {course[i].name}/>
          <Content content = {course[i].parts} />
          <Total all = {course[i].parts} />
          </div>
          )
      }
        return (<>{whole}</>)
  }

export default Course