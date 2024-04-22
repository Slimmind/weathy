import React from 'react';
import './update-button.styles.css';
import { UpdateIcon } from '../../../icons';

interface UpdateButtonProps {
	updateHandler: () => void;
}

export const UpdateButton = ({ updateHandler }: UpdateButtonProps) => {
	return (
		<button
			className='update-button'
			onClick={updateHandler}
			aria-label='update forecast button'
		>
			<UpdateIcon />
		</button>
	);
};
