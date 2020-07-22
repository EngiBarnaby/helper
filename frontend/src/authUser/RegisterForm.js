import React from 'react'

class RegisterForm extends React.Component{

    state = {
        value:
            {
                username:'',
                email:'',
                password1: '',
                password2: '',
            }
    }


      register = event => {
        if(this.state.password1 == this.state.password2){
            fetch('http://127.0.0.1:8000/api/auth/user-create/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username : this.state.username,
                    email : this.state.email,
                    password : this.state.password1,
                })
              })
              .then( data => data.json())
              .then(
                data => {
                    console.log('Пользователь зарегестрирован');
                    this.setState({value :{
                        username:'',
                        email:'',
                        password1: '',
                        password2: '',
                        }
                    }
                    )
                }
              )
              .catch( error => console.error(error))
            }
        }

      

    handleChange = event => {
        const val = this.state.value
        val[event.target.name] = event.target.value
        this.setState({value : val})
    }

    render(){
        const {username, email, password1, password2} = this.state
        return(
            <div>
                <h2>Регистрация</h2>
                <br/>
                <input 
                    placeholder="Имя пользователя"
                    onChange={this.handleChange}
                    name='username'
                    value={username}
                />
                <br/>
                <input 
                    placeholder="Email"
                    onChange={this.handleChange}
                    name='email'
                    value={email}
                />
                <br/>
                <input 
                    placeholder="Пароль"
                    onChange={this.handleChange}
                    name='password1'
                    value={password1}
                />
                <br/>
                <br/>
                <input 
                    placeholder="Пароль"
                    onChange={this.handleChange}
                    name='password2'
                    value={password2}
                />
                <br/>
                <button onClick={this.register}>Регистрация</button>
            </div>
        )
    }
}

export default RegisterForm