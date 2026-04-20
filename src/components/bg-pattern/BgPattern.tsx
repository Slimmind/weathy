import React from 'react';

export const BgPattern: React.FC = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='56'
		height='100'
		style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			height: '100dvh',
			zIndex: -1,
			pointerEvents: 'none',
		}}
	>
		<defs>
			<pattern id='bg-hex' x='0' y='0' width='56' height='100' patternUnits='userSpaceOnUse'>
				<rect width='56' height='100' fill='var(--color-lightest)' />
				<path
					d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100'
					fill='none'
					stroke='var(--color-lighter)'
					strokeWidth='3'
					strokeOpacity='0.5'
				/>
				<path
					d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34'
					fill='none'
					stroke='var(--color-light)'
					strokeWidth='3'
					strokeOpacity='0.2'
				/>
			</pattern>
		</defs>
		<rect width='100%' height='100%' fill='url(#bg-hex)' />
	</svg>
);
