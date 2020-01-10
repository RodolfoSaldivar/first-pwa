import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

export default class Example extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(result){
    console.log('result: ', result);
    if(result){
      this.setState({ result })
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
          <br /><br /><br /><br />
        <p>{this.state.result}</p>
      </div>
    )
  }
}