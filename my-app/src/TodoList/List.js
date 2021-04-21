import { useSelector,useDispatch} from 'react-redux'
import { useEffect } from "react";
function List(){
        let todoListData = useSelector(state=>state.todoListData)
        console.log(todoListData);
        let dispatch = useDispatch()
        
    
    
    return (
        <ul>
                {
                    todoListData.map(item=>{
                        return <li key={item.id}>
                            <input type="checkbox" checked={item.checked} onChange={({target})=>{

                                
                                dispatch({type:'ALTER_TODO',alert:{...item,checked:target.checked}})
                                }}/>
                            <span>{item.content}</span>
                            <span onClick={()=>{dispatch({type:'REMOVE_TODO',removeId:[item.id]})}}>-删除</span>
                    </li>
                    })
                }
                 
        </ul>
    )
}
export default List