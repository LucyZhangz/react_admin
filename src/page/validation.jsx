import React, { Component,createRef } from 'react';
import ReactSimpleVerify from 'react-simple-verify'
import 'react-simple-verify/dist/react-simple-verify.css'
export default class CaptchaCode extends Component {
 reset=()=> {
  const $verify = this.refs.verify 
  $verify.reset()
  this.setState({
    isPass: false
  })
}
  verify=React.createRef()
success(){
  alert('成功')
}
  render(){
     return(
      <div>
        <ReactSimpleVerify ref={this.verify} success={ this.success.bind(this) }/>
      </div>
     )
  }
}
