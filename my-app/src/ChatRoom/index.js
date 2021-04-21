import React from 'react';
import {baseUrl} from '../global.js'

class ChatRoom extends React.Component{
    constructor(props){
        super(props)
        this.handleConnectRoom = this.handleConnectRoom.bind(this)

    }
    handleConnectRoom(){
        let socket = io(`${baseUrl}/chatRoom`)
        socket.on("connect",()=>{
            console.log('connected server');
        })
    }
    render(){
        return (
            <div className="chatRoom-container">
                <button onClick={this.handleConnectRoom}>连接聊天室</button>
            </div>
        )
    }
}

export   default ChatRoom