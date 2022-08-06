import React, { Component ,setState} from 'react'
import screenfull from 'screenfull'
import { FullscreenOutlined,FullscreenExitOutlined } from '@ant-design/icons';


export default class Full extends Component {
    constructor(){
        super()
        //初始化状态
        this.state = {full:true}
       
    }
    
    fullScreen = () => {
        screenfull.toggle()
        this.setState({
            full:!this.state.full})
    }
    render() {
      
        return (
            <div>
          
                <div>我是插件</div>
              <div onClick={this.fullScreen} style={{ fontSize: 20 }}>{this.state.full ? <FullscreenOutlined /> : <FullscreenExitOutlined />}</div>
            </div>
        )
    }
}
