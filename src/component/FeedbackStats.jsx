import PropTypes from 'prop-types'
import { useContext } from 'react'
import React from 'react'
import FeedbackContext from './context/FeedbackContext'

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)

    let avarage = 
        feedback.reduce((acc, cur) => {
           return acc + cur.rating
        }, 0) / feedback.length

avarage = avarage.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Review</h4>
      <h4>Avarage Review: {isNaN(avarage) ? 0 : avarage}</h4>
    </div>
  )
}

FeedbackStats.prototype = {
    feedback: PropTypes.array.isRequired
}


export default FeedbackStats
