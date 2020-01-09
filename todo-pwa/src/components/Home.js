import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
 
export default class QRScanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: 'No result',
    }
 
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    });
    console.log(data);
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
        facingMode='environment'
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode='environment'
          />
          -----------------------------------------------------------------
        {/*facingMode='environment'
                <QrReader
                  delay={this.state.delay}
                  style={previewStyle}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  facingMode='environment'
                  />*/}
        <p>{this.state.result}</p>
      </div>
    )
  }
}