import './css/test.css'
import img from './images/timg.jpg'
import fn,{myname} from './fn'

fn()

let image = new Image()
image.src = img
document.body.appendChild(image);
let btn1 = document.querySelector('#btn1')

console.log('index.js is called');
btn1.onclick=function(){
    console.log(`kaikeba-${myname}`);
}


if(module.hot){
    module.hot.accept('./fn.js',()=>{
        fn()
    })
}
