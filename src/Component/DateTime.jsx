import React from 'react'

const DateTime = ({isoDate}) => {

    const isoDate1 = isoDate
    const date = new Date(isoDate1)
    const formattedDate = date.toLocaleDateString('en-US')
    const formattedTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
    const formattedisoDate = `${formattedDate} ${formattedTime}`
  return (
    <span>{formattedisoDate}</span>
  )
}

export default DateTime