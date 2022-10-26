import { useEffect, useState } from 'react'
import { useFeedbackContext } from '../context/feedback_context'
import RatingSelect from './RatingSelect'

const FeedbackForm = () => {
	const [rating, setRating] = useState(5)
	const [comment, setComment] = useState('')

	const { addFeedback, updateFeedback, feedbackEdit, edit } =
		useFeedbackContext()

	useEffect(() => {
		if (edit) {
			setComment(feedbackEdit.comment)
		}
	}, [feedbackEdit])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (comment) {
			if (edit) {
				updateFeedback(feedbackEdit.id as number, { comment, rating })
			} else {
				addFeedback({ comment, rating })
			}
		}
		setComment('')
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value)
	}
	return (
		<div className='card'>
			<form onSubmit={handleSubmit}>
				<h2>Comment noteriez-vous notre service ?</h2>
				<RatingSelect select={rating => setRating(rating)} />
				<div className='input-group'>
					<input
						type='text'
						placeholder='Votre commentaire'
						value={comment}
						onChange={handleChange}
					/>
					<button disabled={comment ? false : true} className='btn btn-primary'>
						Envoyer
					</button>
				</div>
			</form>
		</div>
	)
}

export default FeedbackForm
