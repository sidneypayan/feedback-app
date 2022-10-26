import { FaTimes, FaEdit } from 'react-icons/fa'
import { useFeedbackContext } from '../context/feedback_context'
import { Feedback } from '../interfaces'

const FeedbackItem = ({ id, comment, rating }: Feedback) => {
	const { deleteFeedback, editFeedback } = useFeedbackContext()

	return (
		<div className='card'>
			<div className='num-display'>{rating}</div>
			<button className='close' onClick={() => deleteFeedback(id as number)}>
				<FaTimes color='purple' />
			</button>
			<button
				className='edit'
				onClick={() => editFeedback({ id, comment, rating })}>
				<FaEdit color='purple' />
			</button>
			<div className='text-display'>{comment}</div>
		</div>
	)
}

export default FeedbackItem
