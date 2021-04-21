import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game/index'
import JWTTest from "./JWTTest/index";
import ChatRoom from "./ChatRoom/index"
import Time from "./Time/index";
import TodoList from "./TodoList/TodoList"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import store from "./store.js";
import { Provider } from "react-redux";
 class App extends React.Component{
   constructor(props){
     super(props)
   }
   render (){
     return (
       <>
       <h1>My React</h1>
       <hr></hr>
      { this.props.children  }
      </>
     )
   }
 }
  ReactDOM.render(
    <Provider store={store}> 
    <Router>
      <div className="app-container">
        <Link to="/" >App</Link>
        <span>|</span>
        <Link to="/Game">Game</Link>
        <span>|</span>
        <Link to="/JWTTest">JWTTest</Link>
        <span>|</span>
        <Link to="/ChatRoom">ChatRoom</Link>
        <span>|</span>
        <Link to="/time">time</Link>
        <span>|</span>
        <Link to="/TodoList">TodoList</Link>
        <hr/>
        <Route path="/" component={App}/>
        <Route path="/Game" component={Game}/>
        <Route path="/JWTTest" component={JWTTest}/>
        <Route path="/ChatRoom" component={ChatRoom}></Route>
        <Route path="/time" component={Time}></Route>
        <Route path="/TodoList/:nosense?" render={({history,location,match})=>{
          console.log(match.params.nosense);
          return <TodoList/>
        }}></Route>
      </div>

    </Router>
    </Provider>
    ,
    document.getElementById('root')
  );
