import { useEffect, useState } from 'react'

type RatingSelectProps = {
	select: (rating: number) => void
	rating: number
}

const RatingSelect = ({ select, rating }: RatingSelectProps) => {
	const [selected, setSelected] = useState(rating)

	useEffect(() => {
		setSelected(rating)
	}, [select])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelected(+e.currentTarget.value)
		select(+e.currentTarget.value)
	}

	return (
		<ul className='rating'>
			{Array.from({ length: 10 }, (_, i) => (
				<li key={i}>
					<input
						id={`num${i + 1}`}
						type='radio'
						name='rating'
						value={i + 1}
						onChange={handleChange}
						checked={selected === i + 1}
					/>
					<label htmlFor={`num${i + 1}`}>{i + 1}</label>
				</li>
			))}
		</ul>
	)
}

export default RatingSelect
