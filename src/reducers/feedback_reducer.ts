import { Feedback } from '../interfaces'

// enum FeedbackActionType {
// 	ADD_FEEDBACK = 'ADD_FEEDBACK',
// 	GET_FEEDBACKS = 'GET_FEEDBACKS',
// 	DELETE_FEEDBACK = 'DELETE_FEEDBACK',
// }

type FeedbackAction =
	| { type: 'ADD_FEEDBACK'; payload: Feedback }
	| { type: 'GET_FEEDBACK'; payload: Feedback[] }
	| { type: 'DELETE_FEEDBACK'; payload: number }
	| { type: 'EDIT_FEEDBACK'; payload: Feedback }
	| { type: 'UPDATE_FEEDBACK'; payload: Feedback }

type FeedbackState = {
	feedback: Feedback[]
	rating: string
	feedbackEdit: Feedback
	edit: boolean
}

const feedback_reducer = (
	state: FeedbackState,
	action: FeedbackAction
): FeedbackState => {
	switch (action.type) {
		case 'GET_FEEDBACK':
			return { ...state, feedback: action.payload }
		case 'ADD_FEEDBACK':
			return { ...state, feedback: [...state.feedback, action.payload] }
		case 'DELETE_FEEDBACK':
			return {
				...state,
				feedback: [
					...state.feedback.filter(item => item.id !== action.payload),
				],
			}
		case 'EDIT_FEEDBACK':
			return { ...state, feedbackEdit: action.payload, edit: true }
		case 'UPDATE_FEEDBACK':
			const id = action.payload.id
			return {
				...state,
				edit: false,
				feedback: state.feedback.map(item =>
					item.id === id ? { ...item, ...action.payload } : item
				),
			}
		default:
			throw new Error('no such action type')
	}
}

export default feedback_reducer
