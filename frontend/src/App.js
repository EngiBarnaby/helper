import React, { Component, useState } from 'react';
import './App.css';
import Todo from './components/Todo'
import LoginForm from './authUser/LoginForm'

function App () {

  const [token, setToken] = useState(localStorage.getItem('token'));


  const userLogin = (tok) => {
    console.log(tok);
    setToken(tok);
  }

    return (
      <div className="App">
        <LoginForm userLogin={userLogin}/>
        {token ? 
        <Todo token={token}/> :
        <h1>Сдесь мог бы быть ваш контент</h1>
        } 
      </div>
    );
}

export default App;
