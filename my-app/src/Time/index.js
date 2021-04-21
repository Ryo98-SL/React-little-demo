import {Component} from "react"

class Time extends Component{
    constructor(props){
        super(props)
        this.state = {
            time:1,
            interval:'',
            timeout:''
        }
    }

    componentDidMount(...args){
        // console.log('Mount');
        //调用计时器
        // this.trick() 

        setTimeout(() => {
            this.setState({time:this.state.time+1})
        }, 1000);
    }
    getSnapshotBeforeUpdate(...args){
        // console.log(args);
        return null
    }
    componentDidUpdate(...args){
        console.log(args);
        //效果等同于计时器
        let timeout = setTimeout(() => {
            this.setState({time:this.state.time+1,timeout})
            
        }, 1000);
        
        console.log(this.state.timeout);
    }
    componentWillUnmount(){
        console.log('unmount');
        clearInterval(this.state.interval)
        clearTimeout(this.state.timeout)
    }
    render(){
        return (
            <div>
                {this.state.time}
            </div>
        )
    }
    //计时器
    trick(){
        let interval = setInterval(()=>{
            this.setState({time:this.state.time+1})
        },1000)
        this.setState({interval})
    }
}
export default Time