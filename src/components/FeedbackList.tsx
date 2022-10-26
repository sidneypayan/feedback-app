import { useEffect } from 'react'
import { useFeedbackContext } from '../context/feedback_context'
import FeedbackItem from './FeedbackItem'

const FeedbackList = () => {
	const { getAllFeedbacks, feedback } = useFeedbackContext()

	useEffect(() => {
		getAllFeedbacks()
	}, [])

	return (
		<div className='feedback-list'>
			{feedback.map(item => (
				<FeedbackItem key={item.id} {...item} />
			))}
		</div>
	)
}

export default FeedbackList
