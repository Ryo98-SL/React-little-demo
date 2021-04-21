import { useState } from "react";
import { useDispatch } from "react-redux";

function AddList(props){
    let [inputContent,setContent] = useState("")
    let dispatch = useDispatch()

    return (
        <input 
        value={inputContent} 
        onChange={({target})=>setContent(target.value)}
        onKeyUp={(e)=>{
            if(e.key=='Enter' && inputContent.trim()){
                console.log(e.key);
            setContent("")
            dispatch({type:'ADD_TODO',newTodo:{id:new Date().getTime(),content:inputContent,checked:false}})
                }
            
        }}
        ></input>
    )
}
export default AddList