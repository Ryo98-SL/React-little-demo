import {createStore,combineReducers} from "redux";

let reducer = function (state={todoListData:[
    {id:1,content:'finish homework',checked:true}
]},action){
    return { todoListData:partialFn(state,action), }
       
}
function partialFn(state,action){
    switch(action.type){
        case 'ADD_TODO':
            console.log('action',action);
            return [
                    ...state.todoListData,
                    action.newTodo
                ]
            
        case 'ALTER_TODO':
           
            let todoListData = state.todoListData.slice()
            for(let i = 0 ; i<todoListData.length;i++){
                let item = state.todoListData[i]
               
                if(item.id===action.alert.id){
                    
                    todoListData[i] ={...action.alert} 
                    console.log(todoListData[i]);
                    break
                }
            }
            
            return todoListData
            
        case 'REMOVE_TODO':
            return state.todoListData.filter(item=>!action.removeId.includes(item.id))
        case 'CLEAR_DONE':
            console.log('clear done');
            return state.todoListData.filter(item=>!item.checked)
            
        
    }

    return state.todoListData
}


export default createStore(reducer)