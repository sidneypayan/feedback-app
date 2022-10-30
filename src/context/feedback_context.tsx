import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Feedback } from '../interfaces'
import feedback_reducer from '../reducers/feedback_reducer'

type FeedbackProviderProps = {
	children: ReactNode
}

type FeedbackContext = {
	getAllFeedbacks: () => void
	addFeedback: (feedback: Feedback) => void
	deleteFeedback: (id: number) => void
	addRating: (rating: string) => void
	editFeedback: (item: Feedback) => void
	updateFeedback: (id: number, updatedFeedback: Feedback) => void
	feedback: Feedback[]
	rating: string
	feedbackEdit: Feedback
	edit: boolean
}

const FeedbackContext = createContext({} as FeedbackContext)
// const FeedbackContext = createContext<null | FeedbackContext>(null)

const initialState = {
	feedback: [],
	rating: '',
	feedbackEdit: {
		comment: '',
		rating: 0,
	},
	edit: false,
}

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
	const [state, dispatch] = useReducer(feedback_reducer, initialState)

	const addRating = (rating: string) => {
		console.log(rating)
	}

	const addFeedback = async (feedback: Feedback) => {
		const res = await fetch('http://localhost:5000/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(feedback),
		})

		const data = await res.json()
		dispatch({ type: 'ADD_FEEDBACK', payload: data })
	}

	const getAllFeedbacks = async () => {
		const res = await fetch('http://localhost:5000/feedback')
		const data = await res.json()
		dispatch({ type: 'GET_FEEDBACK', payload: data })
	}

	const deleteFeedback = async (id: number) => {
		await fetch(`http://localhost:5000/feedback/${id}`, {
			method: 'DELETE',
		})
		dispatch({ type: 'DELETE_FEEDBACK', payload: id })
	}

	const editFeedback = (item: Feedback) => {
		dispatch({ type: 'EDIT_FEEDBACK', payload: item })
	}

	const updateFeedback = async (id: number, editedFeedback: Feedback) => {
		const newFeedback = {
			id,
			comment: editedFeedback.comment,
			rating: editedFeedback.rating,
		}

		const res = await fetch(`http://localhost:5000/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		})

		const data = await res.json()

		dispatch({ type: 'UPDATE_FEEDBACK', payload: data })
	}

	return (
		<FeedbackContext.Provider
			value={{
				...state,
				addFeedback,
				deleteFeedback,
				updateFeedback,
				getAllFeedbacks,
				addRating,
				editFeedback,
			}}>
			{children}
		</FeedbackContext.Provider>
	)
}

export const useFeedbackContext = () => {
	return useContext(FeedbackContext)
}
