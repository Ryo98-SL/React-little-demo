
import AddList from "./AddList";
import DashBroad from "./DashBroad";
import List from "./List";
import './todolist.css'
import { useSelector,useDispatch} from 'react-redux'
function TodoList(){
    let listLen = useSelector(store=>store.todoListData).length
    return (
        
            <div className="todolist">
            <AddList />
             <List></List>
             {
                listLen>0?
                 <DashBroad></DashBroad>
                 :
                 ''
             }
                             
        </div>
       
        
    )
}

export default TodoList