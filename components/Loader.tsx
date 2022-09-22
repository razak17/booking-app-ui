import React from 'react';

function Loader() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '2rem',
				marginTop: '3rem'
			}}
		>
			<p>Loading...</p>
		</div>
	);
}

export default Loader;
