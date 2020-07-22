import React from 'react';
import './App.css';
import Todo from './components/Todo'
import LoginForm from './authUser/LoginForm'
import RegisterForm from './authUser/RegisterForm'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      token : '',
      username : '',
      user_id: '',
      login: false,
    }
    this.userLogin = this.userLogin.bind(this)
  }
  // const [token, setToken] = useState(localStorage.getItem('token'));
  // const [username, setUsername] = useState('')


  // const userLogin = (tok, name) => {
  //   setToken(tok);
  //   setUsername(name)
  // }

  userLogin(tok, name, id){
    this.setState({
      token : tok,
      username : name,
      user_id: id,
      login: true,
    })
    console.log(this.state.id);
  }

  render(){
    const {token, username, user_id, login} = this.state
    return (
      <div className="App">
        {!login ? <LoginForm userLogin={this.userLogin}/> : null}
        {/* <RegisterForm /> */}
        {token ? 
        <Todo 
          token={token}
          username={username}
          user_id={user_id}
        /> :
        null
        } 
      </div>
    );
  }
}

export default App;
