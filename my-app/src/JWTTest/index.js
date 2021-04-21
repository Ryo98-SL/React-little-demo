import React from 'react';
import axios from 'axios'
import {baseUrl} from '../global.js'

class JWTTest extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        
        let {target} = e
        
        let [usernameEl,pwdEl] = [...target]
        
        axios(`${baseUrl}/user`,{
            method:'post',
            
            data: {
                username:usernameEl.value,
                password:pwdEl.value
            }
        }).then(res=>{
            console.log(res);
            let {data:{token,statusCode,status,reason}}= res
            console.log('token',token);
            if(!status){
                reason && alert(reason)
                return
            }else{
                alert('登录成功!')
            }
            
            token && localStorage.setItem('token',token)
            
        }).catch(e=>{
            console.log('post error');
        })
        e.preventDefault()
    }
    render(){
        return (
            <div className="JwtContainer">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        用户名:<input defaultValue={this.state.username} name="username" type="text"/>
                    </label>
                    <label>
                        密码:<input defaultValue={this.state.password} name="password" type="password"/>
                    </label>
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

export default JWTTest