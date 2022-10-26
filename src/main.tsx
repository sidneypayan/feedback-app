import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { FeedbackProvider } from './context/feedback_context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<FeedbackProvider>
			<App />
		</FeedbackProvider>
	</React.StrictMode>
)
