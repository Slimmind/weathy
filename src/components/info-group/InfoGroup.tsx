import React from 'react';
import './info-group.styles.css';

type InfoGroupProps = {
	label: string;
	value: string;
};

export const InfoGroup = ({ label, value }: InfoGroupProps) => (
	<div className='info-group'>
		<div className='label'>{label}</div>
		<span className='value-sub-info'>{value}</span>
	</div>
);
