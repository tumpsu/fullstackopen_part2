const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    console.log('sum: ', sum, 'part: ', part);
    return sum + part.exercises;
  }, 0)

  return <p><strong>Number of exercises {total}</strong></p>
}

export default Total;
