import React from 'react'

class Login extends React.Component{

    state = {
        value:{username:'', password: ''}
    }

    login = event => {
        fetch('http://127.0.0.1:8000/api/auth/login/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.value)
        })
        .then( data => data.json())
        .then(
          data => {
            localStorage.setItem('token', data.token);
            this.props.userLogin(data.token, this.state.value.username, data.id);
          }
        )
        .catch( error => console.error(error))
      }


    handleChange = event => {
        const val = this.state.value
        val[event.target.name] = event.target.value
        this.setState({value : val})
    }

    render(){
        const { username, password} = this.state.value
        return(
            <div className='login-form container'>
                <h2>Войти в аккаунт</h2>
                <br/>
                <input 
                    placeholder="Имя пользователя"
                    onChange={this.handleChange}
                    name='username'
                    value={username}
                />
                <br/>
                <input 
                    placeholder="Пароль"
                    onChange={this.handleChange}
                    name='password'
                    value={password}
                />
                <br/>
                <button onClick={this.login}>Войти</button>
                <button>Регистрация</button>
            </div>
        )
    }

}

export default Login