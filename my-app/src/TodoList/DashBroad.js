import { useSelector,useDispatch} from 'react-redux'
function DashBroad(){
    let todoListData = useSelector(store=>store.todoListData)
    let dispatch     = useDispatch()
    let count = todoListData.map((item)=>{
        return Number(item.checked)
    }).reduce((total,num)=>(total+num))
    let total = todoListData.length
    console.log('count',count);
    return (
        <div className="summary">
                 <p>{count}项已完成</p>
                 <p>共计{total}项</p>
                 <p onClick={()=>{dispatch({type:'CLEAR_DONE'})}}>clear done</p>
        </div>
    )
}
export default DashBroad