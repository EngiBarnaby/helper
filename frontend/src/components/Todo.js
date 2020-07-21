import React from 'react'
import TodoItem from './TodoItem'
import TodoInput from './TodoInput'

const urlListTasks = 'http://127.0.0.1:8000/api/all-tasks/'
const urlCreateTask = 'http://127.0.0.1:8000/api/task-create/'

class Todo extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {
            activeItem: {
                id:null,
                text:'',
                done:false,
            },
            todoList : [],
            editing: false,

        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.fetchTasks = this.fetchTasks.bind(this)
        this.changeToggler = this.changeToggler.bind(this)
        this.getCookie = this.getCookie.bind(this)
      }
    
      getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

      componentDidMount(){
        this.fetchTasks()
      }
    
    //   fetchTasks(){
    //     fetch(urlListTasks)
    //     .then(response => response.json())
    //     .then(data =>
    //       this.setState({
    //         todoList:data
    //       })
    //       )
    //   }

    fetchTasks(){
        var url = urlListTasks
        fetch(url, {
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${this.props.token}`
              },
        })
        .then(response => response.json())
        .then(data =>
          this.setState({
            todoList:data
          })
          )
      }


      changeToggler(task){
        task.done = !task.done
        var csrftoken = this.getCookie('csrftoken')
        var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`
    
          fetch(url, {
            method:'POST',
            headers:{
              'Content-type':'application/json',
              'X-CSRFToken':csrftoken,
              Authorization: `Token ${this.props.token}`,
            },
            body:JSON.stringify({'done': task.done, 'text':task.text})
          }).then(() => {
            this.fetchTasks()
          })
    
        console.log('TASK:', task.text)
      }

      handleChange(e){
        const value = e.target.value

        this.setState({
            activeItem:{
                ...this.state.activeItem,
                text: value,
            }
        })
        // console.log(this.state.activeItem)
        }

    handleSubmit(e){
        e.preventDefault()
        const csrftoken = this.getCookie('csrftoken');
        const url = urlCreateTask
        if(this.state.activeItem.text != ''){
            fetch(url, {
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'X-CSRFToken': csrftoken,
                    Authorization: `Token ${this.props.token}`,            },
                body:JSON.stringify(this.state.activeItem)
            }).then((response) => {
                this.fetchTasks()
                this.setState({
                    activeItem: {
                        id:null,
                        text: '',
                        done: false,
                    }
                })
            }).catch(function(error){
                console.log("Error", error)
            })
        }
    }

    render(){
        const todoListAtive = this.state.todoList.filter(item => !item.done)
        const todoListDone = this.state.todoList.filter( item => item.done)
        return(
            <div className="todo-container">
                <div>
                    <div className="todolist-wrapper">
                        <TodoInput
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            inputValue={this.state.activeItem.text}
                        />
                        {[...todoListAtive, ...todoListDone].map(task => <TodoItem
                        fetchTasks={this.fetchTasks}
                        getCookie={this.getCookie}
                        task={task} 
                        text={task.text}
                        id={task.id}
                        done={task.done}
                        key={task.id}
                        changeToggler={this.changeToggler}
                        token={this.props.token}
                        />)}
                        <button  
                            onClick={() => console.log(this.state.todoList)}
                            value="Нажми">
                            Нажми
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo