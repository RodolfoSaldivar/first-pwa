import React, { Component } from 'react'

class Home extends Component {
	render() {
		return (
			<div>
				Direct Back Camera Access:
				<br />
				<input type="file" accept="image/*" capture />
				<br /><br />
				Image Options:
				<br />
				<input type="file" accept="image/*" />
			</div>
		);
	}
}

export default Home
