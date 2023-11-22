import React from 'react'
import classes from './Modal.module.css'

const Modal = ({ children }) => {
	const rootClasses = [classes.modal]

	return (
		<div className={rootClasses}>
			<div className={classes.modalContent}>
				{children}
			</div>
		</div>
	)
}

export default Modal
