import React from 'react';
import Normal from './Normal';
import Legacy from './Legacy';

const Home = () => {
	return (
		<div>
			Normal:
			<Normal />
			------------------------------------------------------
			<br />
			Legacy:
			<Legacy />
		</div>
	);
};

export default Home;