import { useState, useContext, useEffect } from "react"
import FeedbackContext from "./context/FeedbackContext"
import Card from "./shared/Card"
import Buttom from "./shared/Buttom"
import RatingSelect from "./RatingSelect"

function FeedbackForm() {
const [text, setText] = useState('')
const [rating, setRating] = useState (10)
const [btnDisabled, setBtnDisabled] = useState(true)
const [message, setMessage] = useState('')

const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

useEffect(() => {
  if(feedbackEdit.edit === true){
    setBtnDisabled(false)
    setText(feedbackEdit.item.text)
    setRating(feedbackEdit.item.rating)
  }
}, [feedbackEdit])

const handleTextChange = (e) => {
  if (text === '' ) {
    setBtnDisabled(true)
    setMessage(null)
  } else if (text !== '' && text.trim().length <= 10) {
    setMessage('Text must be at least 10 characters.')
    setBtnDisabled(true)
  }else{
    setMessage(null)
    setBtnDisabled(false)
  }
    setText(e.target.value)
}

const handleChange = (e) => {
  e.preventDefault()
  if(text.trim().length > 10){
    const newFeedback = {
      text,
      rating,
    }

    if(feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback)
    }else{
      addFeedback(newFeedback)
    }
    setText('')
  }
}

  return (
    <Card>
    <form onSubmit={handleChange}>
    <h2>How would you rate our service with you?</h2>
      <RatingSelect select={(rating) => setRating(rating)}/>
      <div className="input-group">
            <input onChange={handleTextChange} 
            type="text" placeholder="Write your review...." 
            value={text} />
            <Buttom 
            type='submit' 
            isDisabled={btnDisabled}
            >
            Send
            </Buttom>
      </div>
      {message && <div className="message">{message}</div>}
    </form>
    </Card>
  )
}

export default FeedbackForm
