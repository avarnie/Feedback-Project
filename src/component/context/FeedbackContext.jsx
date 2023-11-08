import { createContext, useState } from "react";
import { v4 as uuidv4} from "uuid"

const FeedbackContext = createContext ();

export const FeedbackProvider = ({children}) => {
    const [feedback, setfeedback] = useState([
        {
          id: 1,
          text: 'Your service is exceptional',
          rating: 10
        }
    ])

    const [feedbackEdit, setfeedbackEdit] = useState({
        item: {},
        edit: false
})

    // Delete Feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            setfeedback(feedback.filter(item => item.id !== id))
        }
    }

    // Update Feedback
    const updateFeedback = (id, updItem) => {
        setfeedback(feedback.map((item) => (item.id === id
            ? {...item, ...updItem} : item)
            ))
    }
    
    //Add feedback Edit
    const editFeedback = (item) => {
        setfeedbackEdit({
            item,
            edit: true
    })
    }

    //Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setfeedback([newFeedback, ...feedback])
    }

    return  <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext